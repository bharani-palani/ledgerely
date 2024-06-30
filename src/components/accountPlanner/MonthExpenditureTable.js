/* eslint-disable new-cap */
/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from "react";
import BackendCore from "../../components/configuration/backend/BackendCore";
import helpers from "../../helpers";
import apiInstance from "../../services/apiServices";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PlanInfoModal from "./PlanInfoModal";
import TallyModal from "./TallyModal";
import FundTransferModal from "./FundTransferModal";
import Loader from "react-loader-spinner";
import { AccountContext } from "./AccountPlanner";
import CsvDownloader from "react-csv-downloader";
import { FormattedMessage, injectIntl } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import { useQuery } from "../GlobalHeader/queryParamHook";

const MonthExpenditureTable = (props, context) => {
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const { intl, ...rest } = props;
  const { incExpList, bankList, bankSelected, bankDetails, monthYearSelected } =
    accountContext;
  const [planCards, setPlanCards] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [totals, setTotals] = useState([]);
  const [openPlanModal, setOpenPlanModal] = useState(false); // change to false
  const [openTallyModal, setOpenTallyModal] = useState(false); // change to false
  const [fundTransferModal, setFundTransferModal] = useState(false); // change to false
  const [selectedPlan, setSelectedPlan] = useState({});
  const [loader, setLoader] = useState(false);
  const columns = [
    { displayName: "Transaction", id: "inc_exp_name" },
    { displayName: "Date", id: "inc_exp_date" },
    { displayName: "Type", id: "inc_exp_type" },
    { displayName: "Amount", id: "inc_exp_amount" },
  ];
  const now = helpers.getNow();
  const [monthExpenditureConfig, setMonthExpenditureConfig] = useState({});
  const defApiParam = {
    start: 0,
    limit: 10,
    searchString: "",
  };
  const [apiParams, setApiParams] = useState(defApiParam);

  useEffect(() => {
    setMonthExpenditureConfig({
      config: {
        header: {
          searchPlaceholder: intl.formatMessage({
            id: "searchHere",
            defaultMessage: "searchHere",
          }),
          searchable: true,
        },
        footer: {
          total: {
            title: intl.formatMessage({ id: "total", defaultMessage: "total" }),
            locale: bankDetails[0].bank_locale,
            currency: bankDetails[0].bank_currency,
            maxDecimal: 2,
          },
          pagination: {
            currentPage: "last",
            maxPagesToShow: 5,
          },
        },
      },
      rowElements: [],
      Table: "income_expense",
      TableRows: [
        "inc_exp_id",
        "inc_exp_name",
        "inc_exp_amount",
        "inc_exp_plan_amount",
        "inc_exp_type",
        "inc_exp_date",
        "inc_exp_category",
        "inc_exp_bank",
        "inc_exp_comments",
        "inc_exp_added_at",
        "inc_exp_is_planned",
      ],
      TableAliasRows: [
        "id",
        "transaction",
        "amount",
        "plan",
        "type",
        "date",
        "category",
        "bank",
        "comments",
        "recorded",
        "isPlanned",
      ].map(al => intl.formatMessage({ id: al, defaultMessage: al })),
      defaultValues: [
        { inc_exp_type: "Dr" },
        { inc_exp_amount: 0 },
        { inc_exp_plan_amount: 0 },
        { inc_exp_date: moment(new Date()).format("YYYY-MM-DD") },
      ],
      showTooltipFor: ["inc_exp_name", "inc_exp_comments"],
    });
  }, [intl, apiParams]);

  const getAllApi = () => {
    if (monthYearSelected) {
      setDbData([]);
      setLoader(true);
      const [smonth, year] = monthYearSelected.split("-");
      const month = helpers.strToNumMonth[smonth];
      const calDays = new Date(year, month, 0).getDate();
      const wClause = `inc_exp_date between "${year}-${month}-01" and "${year}-${month}-${calDays}" and inc_exp_bank = ${bankSelected} and inc_exp_appId = "${userContext.userConfig.appId}"`;
      const incExpListDropDownObject = {
        fetch: {
          dropDownList: incExpList.map(({ id, value }) => ({ id, value })),
        },
        searchable: true,
      };
      const bankListArray = {
        fetch: {
          dropDownList: bankList,
        },
        searchable: true,
      };
      const a = getBackendAjax(wClause);
      Promise.all([a])
        .then(async r => {
          const data = r[0].data.response;
          setDbData(data);
          setMonthExpenditureConfig(prev => ({
            ...prev,
            ...{
              rowElements: [
                "checkbox",
                "textbox",
                "number",
                moment(data?.table[0]?.inc_exp_date).isAfter()
                  ? "number"
                  : "label",
                {
                  radio: {
                    radioList: [
                      {
                        label: intl.formatMessage({
                          id: "credit",
                          defaultMessage: "credit",
                        }),
                        value: "Cr",
                        checked: false,
                      },
                      {
                        label: intl.formatMessage({
                          id: "debit",
                          defaultMessage: "debit",
                        }),
                        value: "Dr",
                        checked: true,
                      },
                    ],
                  },
                },
                "date",
                incExpListDropDownObject,
                bankListArray,
                "textbox",
                "relativeTime",
                "boolean",
              ],
            },
          }));
        })
        .finally(() => setLoader(false));
    }
  };

  useEffect(() => {
    getAllApi();
  }, [monthYearSelected, bankSelected, incExpList, bankList, intl]);

  const onReFetchData = () => {
    getAllApi();
  };

  useEffect(() => {
    if (dbData?.table?.length > 0) {
      calculatePlanning(dbData);
    }
  }, [dbData]);

  const getBackendAjax = wClause => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    formdata.append("TableRows", monthExpenditureConfig.TableRows);
    formdata.append("Table", monthExpenditureConfig.Table);
    formdata.append("limit", apiParams.limit);
    formdata.append("start", apiParams.start);
    formdata.append("searchString", apiParams.searchString);
    if (wClause) {
      formdata.append("WhereClause", wClause);
    }
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const getPlanSum = () => {
    const [smonth, year] = monthYearSelected.split("-");
    const month = helpers.strToNumMonth[smonth];
    const calDays = new Date(year, month, 0).getDate();

    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    formdata.append("bank", bankSelected);
    formdata.append("startDate", `${year}-${month}-01`);
    formdata.append("endDate", `${year}-${month}-${calDays}`);
    return apiInstance.post("/account_planner/getPlanSum", formdata);
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id='button-tooltip-1' className='in show' {...rest}>
      {content}
    </Tooltip>
  );

  const calculatePlanning = dbData => {
    getPlanSum()
      .then(res => {
        const planData = res.data.response;
        const plan = {
          goodPlans: planData.goodPlans,
          goodPlanCount: planData.goodPlanCount,
          badPlans: planData.badPlans,
          badPlanCount: planData.badPlanCount,
          noPlans: planData.noPlans,
          noPlanCount: planData.noPlanCount,
          achievedPlans: planData.achievedPlans,
          achievedPlanCount: planData.achievedPlanCount,
        };

        const totals = [
          {
            amount: dbData?.total?.inc_exp_amount[0]?.value,
            label: intl.formatMessage({
              id: "income",
              defaultMessage: "income",
            }),
            flagString: "success",
          },
          {
            amount: dbData?.total?.inc_exp_amount[1]?.value,
            label: intl.formatMessage({
              id: "expense",
              defaultMessage: "expense",
            }),
            flagString: "info",
          },
          {
            amount: dbData?.total?.inc_exp_amount[2]?.value,
            label: intl.formatMessage({
              id: "balance",
              defaultMessage: "balance",
            }),
            flagString: "danger",
          },
          {
            amount: dbData?.total?.inc_exp_plan_amount[0]?.value,
            label: intl.formatMessage({
              id: "planning",
              defaultMessage: "planning",
            }),
            flagString: "warning",
          },
        ];
        setTotals(totals);
        const cards = [
          {
            key: "goodPlans",
            flagString: "success",
            planString: intl.formatMessage({
              id: "goodPlans",
              defaultMessage: "goodPlans",
            }),
            planCount: plan.goodPlanCount,
            planTotal: plan.goodPlans,
          },
          {
            key: "achievedPlans",
            flagString: "info",
            planString: intl.formatMessage({
              id: "achievedPlans",
              defaultMessage: "achievedPlans",
            }),
            planCount: plan.achievedPlanCount,
            planTotal: plan.achievedPlans,
          },
          {
            key: "badPlans",
            flagString: "danger",
            planString: intl.formatMessage({
              id: "badPlans",
              defaultMessage: "badPlans",
            }),
            planCount: plan.badPlanCount,
            planTotal: plan.badPlans,
          },
          {
            key: "noPlans",
            flagString: "warning",
            planString: intl.formatMessage({
              id: "noPlans",
              defaultMessage: "noPlans",
            }),
            planCount: plan.noPlanCount,
            planTotal: plan.noPlans,
          },
        ];
        setPlanCards(cards);
      })
      .catch(e => console.log("bbb", e));
  };

  const exportToPdf = () => {
    const body = dbData?.table.map(
      (
        {
          inc_exp_name,
          inc_exp_amount,
          inc_exp_plan_amount,
          inc_exp_type,
          inc_exp_date,
          inc_exp_comments,
        },
        i,
      ) => {
        return [
          i + 1,
          inc_exp_name,
          inc_exp_amount,
          inc_exp_plan_amount,
          inc_exp_type,
          inc_exp_date,
          inc_exp_comments,
        ];
      },
    );
    const head = [
      "#",
      "Transaction",
      "Amount",
      "Planned",
      "Type",
      "Date",
      "Comments",
    ];
    const doc = new jsPDF();
    doc.text(
      `${helpers.stringToCapitalize(
        monthExpenditureConfig.Table,
      )} (${monthYearSelected})`,
      15,
      10,
    );
    doc.autoTable({
      styles: { overflow: "linebreak" },
      theme: "grid",
      head: [head],
      body: [...body],
    });

    const mTotal = totals.map(total => helpers.lacSeperator(total.amount));

    doc.autoTable({
      styles: { overflow: "linebreak", halign: "center" },
      theme: "striped",
      head: [["Income", "Expense", "Balance", "Planning"]],
      body: [mTotal],
    });

    const pTotal = planCards.map(plan =>
      helpers.lacSeperator(
        plan?.planTotal,
        monthExpenditureConfig?.config?.footer?.total?.currency,
      ),
    );
    doc.autoTable({
      styles: { overflow: "linebreak", halign: "center" },
      theme: "striped",
      head: [["Good Plans", "Achieved Plans", "Bad Plans", "No Plans"]],
      body: [pTotal],
    });

    doc.save(`${monthExpenditureConfig.Table}-${now}`);
  };

  const onPlanClick = key => {
    const [smonth, year] = monthYearSelected.split("-");
    const month = helpers.strToNumMonth[smonth];
    const calDays = new Date(year, month, 0).getDate();
    let clause = {
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-${calDays}`,
      bankSelected,
    };
    switch (key) {
      case "goodPlans":
        clause = {
          ...clause,
          label: intl.formatMessage({
            id: "goodPlans",
            defaultMessage: "goodPlans",
          }),
          criteria: `G100`,
        };
        break;
      case "achievedPlans":
        clause = {
          ...clause,
          label: intl.formatMessage({
            id: "achievedPlans",
            defaultMessage: "achievedPlans",
          }),
          criteria: `E100`,
        };
        break;
      case "badPlans":
        clause = {
          ...clause,
          label: intl.formatMessage({
            id: "badPlans",
            defaultMessage: "badPlans",
          }),
          criteria: `0TO100`,
        };
        break;
      case "noPlans":
        clause = {
          ...clause,
          label: intl.formatMessage({
            id: "noPlans",
            defaultMessage: "noPlans",
          }),
          criteria: `E0`,
        };
        break;
      default:
    }
    setOpenPlanModal(true);
    setSelectedPlan(clause);
  };

  const onPostApi = response => {
    const { status, data } = response;
    if (status === 200) {
      if (
        response &&
        data &&
        typeof data.response === "boolean" &&
        data.response !== null &&
        data.response
      ) {
        accountContext.renderToast({
          message: intl.formatMessage({
            id: "transactionSavedSuccessfully",
            defaultMessage: "transactionSavedSuccessfully",
          }),
        });
      }
      if (
        response &&
        data &&
        typeof data.response === "boolean" &&
        data.response !== null &&
        data.response === false
      ) {
        accountContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "noFormChangeFound",
            defaultMessage: "noFormChangeFound",
          }),
        });
      }
      if (response && data && data.response === null) {
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: <UpgradeHeading />,
          content: <UpgradeContent />,
        });
      }
      if (
        response &&
        data &&
        typeof data.response === "object" &&
        data.response !== null
      ) {
        let intlKey;
        switch (data.response.number) {
          case 1451:
            intlKey = "foreignKeyDeleteMessage";
            break;
          default:
            intlKey = "";
        }
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: intlKey,
            defaultMessage: intlKey,
          }),
        });
      }
    } else {
      accountContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "unableToReachServer",
          defaultMessage: "unableToReachServer",
        }),
      });
    }
  };

  const onReplanHandle = () => {
    const rElements = monthExpenditureConfig.rowElements.map((r, i) =>
      i === 3 ? "number" : r,
    );
    setMonthExpenditureConfig({
      ...monthExpenditureConfig,
      ...{
        rowElements: rElements,
      },
    });
  };

  const onChangeParams = obj => {
    setApiParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    getAllApi();
  }, [apiParams]);

  const searchParams = useQuery();
  const params = React.useMemo(
    () => ({
      fetch: searchParams.get("fetch"),
      search: searchParams.get("search"),
    }),
    [searchParams],
  );

  useEffect(() => {
    if (params.fetch && params.fetch === "bankTransactions" && params.search) {
      setApiParams(prev => ({
        ...prev,
        searchString: params.search,
      }));
    }
  }, [params]);

  return (
    <div className='settings'>
      {openPlanModal && (
        <PlanInfoModal
          className='planInfoModal'
          show={openPlanModal}
          onHide={() => setOpenPlanModal(false)}
          size='lg'
          animation={false}
          monthYearSelected={monthYearSelected}
          bankSelected={bankSelected}
          selectedPlan={selectedPlan}
        />
      )}
      {openTallyModal && (
        <TallyModal
          className='planInfoModal'
          show={openTallyModal}
          onHide={() => setOpenTallyModal(false)}
          size='sm'
          totals={totals}
          animation={false}
        />
      )}
      {fundTransferModal &&
        monthExpenditureConfig.rowElements[7].fetch.dropDownList.length > 0 && (
          <FundTransferModal
            className=''
            show={fundTransferModal}
            onHide={() => setFundTransferModal(false)}
            size='md'
            animation={false}
            srcArr={monthExpenditureConfig.rowElements[7].fetch.dropDownList}
            incExpList={
              monthExpenditureConfig.rowElements[6].fetch.dropDownList
            }
            centered
          />
        )}
      <div className=''>
        {!loader && dbData && Object.keys(dbData)?.length > 0 && (
          <>
            <div className='buttonGrid'>
              {monthYearSelected && dbData && (
                <>
                  <h6>
                    {`${intl.formatMessage({
                      id: monthYearSelected.split("-")[0].toLowerCase(),
                      defaultMessage: monthYearSelected
                        .split("-")[0]
                        .toLowerCase(),
                    })} ${monthYearSelected.split("-")[1]}`}
                  </h6>
                  <div className='d-flex flex-row-reverse'>
                    <div>
                      <OverlayTrigger
                        placement='left'
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(
                          props,
                          intl.formatMessage({
                            id: "fundTransfer",
                            defaultMessage: "fundTransfer",
                          }),
                        )}
                        triggerType='hover'
                      >
                        <i
                          className={`fa fa-arrows-h roundedButton ${userContext.userData.theme} pull-right`}
                          onClick={() => setFundTransferModal(true)}
                        />
                      </OverlayTrigger>
                    </div>
                    <div>
                      <OverlayTrigger
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(
                          props,
                          intl.formatMessage(
                            {
                              id: "exportToValue",
                              defaultMessage: "exportToValue",
                            },
                            { value: "PDF" },
                          ),
                        )}
                        triggerType='hover'
                      >
                        <i
                          onClick={() => exportToPdf()}
                          className={`fa fa-file-pdf-o roundedButton ${userContext.userData.theme} pull-right`}
                        />
                      </OverlayTrigger>
                    </div>
                    <CsvDownloader
                      datas={helpers.stripCommasInCSV(dbData?.table)}
                      filename={`Income-Expense-${now}.csv`}
                      columns={columns}
                    >
                      <OverlayTrigger
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(
                          props,
                          intl.formatMessage(
                            {
                              id: "exportToValue",
                              defaultMessage: "exportToValue",
                            },
                            { value: "CSV" },
                          ),
                        )}
                        triggerType='hover'
                      >
                        <i
                          className={`fa fa-file-excel-o roundedButton ${userContext.userData.theme} pull-right`}
                        />
                      </OverlayTrigger>
                    </CsvDownloader>
                    <div>
                      <OverlayTrigger
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(
                          props,
                          intl.formatMessage({
                            id: "replan",
                            defaultMessage: "replan",
                          }),
                        )}
                        triggerType='hover'
                      >
                        <i
                          onClick={() => onReplanHandle()}
                          className={`fa fa-repeat roundedButton ${userContext.userData.theme} pull-right`}
                        />
                      </OverlayTrigger>
                    </div>
                    <div>
                      <OverlayTrigger
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(
                          props,
                          intl.formatMessage({
                            id: "tally",
                            defaultMessage: "tally",
                          }),
                        )}
                        triggerType='hover'
                      >
                        <i
                          onClick={() => setOpenTallyModal(true)}
                          className={`fa fa-text-width roundedButton ${userContext.userData.theme} pull-right`}
                        />
                      </OverlayTrigger>
                    </div>
                  </div>
                </>
              )}
            </div>
            <BackendCore
              key={"incExpTable"}
              id={"incExpTable"}
              config={monthExpenditureConfig.config}
              Table={monthExpenditureConfig.Table}
              TableRows={monthExpenditureConfig.TableRows}
              TableAliasRows={monthExpenditureConfig.TableAliasRows}
              rowElements={monthExpenditureConfig.rowElements}
              dbData={dbData}
              postApiUrl='/account_planner/postAccountPlanner'
              onPostApi={response => onPostApi(response)}
              apiParams={apiParams}
              onChangeParams={obj => onChangeParams(obj)}
              showTooltipFor={monthExpenditureConfig.showTooltipFor}
              defaultValues={monthExpenditureConfig.defaultValues}
              onTableUpdate={data => {
                calculatePlanning(data);
              }}
              onReFetchData={onReFetchData}
              cellWidth={[4, 13, 8, 8, 13, 8, 13, 13, 13, 10, 5]}
              ajaxButtonName={intl.formatMessage({
                id: "submit",
                defaultMessage: "submit",
              })}
              appIdKeyValue={{
                key: "inc_exp_appId",
                value: userContext.userConfig.appId,
              }}
              theme={userContext.userData.theme}
            />
            <div>
              <div className='row'>
                {totals.map(total => (
                  <div key={total.label} className='col-md-3 col-6 py-4'>
                    <div className=''>
                      <div className=''>
                        <div className={`p-6 text-center`}>
                          <h5>{total.label}</h5>
                        </div>
                      </div>
                      <div className={``}>
                        <div className={`text-center text-${total.flagString}`}>
                          {helpers.countryCurrencyLacSeperator(
                            bankDetails[0].bank_locale,
                            bankDetails[0].bank_currency,
                            total.amount,
                            2,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='row'>
                {planCards.map(plan => (
                  <div key={plan.key} className='col-md-3 col-6 py-4'>
                    <div className=''>
                      <div className=''>
                        <div className={`p-6 text-center`}>
                          <h5>
                            {plan.planString}
                            <sup
                              className={`superScript text-${plan.flagString} border-${plan.flagString}`}
                            >
                              {plan.planCount}
                            </sup>
                          </h5>
                        </div>
                      </div>
                      <div className={``}>
                        <div className={`text-center text-${plan.flagString}`}>
                          <button
                            onClick={() => onPlanClick(plan.key)}
                            className={`btn btn-sm btn-${plan.flagString}`}
                          >
                            {helpers.countryCurrencyLacSeperator(
                              bankDetails[0].bank_locale,
                              bankDetails[0].bank_currency,
                              plan.planTotal,
                              2,
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {!loader && !dbData && !dbData?.table.length && (
          <div className='py-3 text-center'>
            <FormattedMessage
              id='noRecordsGenerated'
              defaultMessage='noRecordsGenerated'
            />
          </div>
        )}
        {loader && (
          <div className='relativeSpinner'>
            <Loader
              type={helpers.loadRandomSpinnerIcon()}
              color={document.documentElement.style.getPropertyValue(
                "--app-theme-bg-color",
              )}
              height={100}
              width={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default injectIntl(MonthExpenditureTable);
