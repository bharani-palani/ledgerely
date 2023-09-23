/* eslint-disable new-cap */
/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
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

const MonthExpenditureTable = (props, context) => {
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
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
  const [monthExpenditureConfig, setMonthExpenditureConfig] = useState({
    config: {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: "total", defaultMessage: "total" }),
          locale: bankDetails[0].bank_locale,
          currency: bankDetails[0].bank_currency,
          maxDecimal: 2,
          doubleEntryBalanceStrings: {
            zero: intl.formatMessage({
              id: "solved",
              defaultMessage: "solved",
            }),
            plus: intl.formatMessage({
              id: "ahead",
              defaultMessage: "ahead",
            }),
            minus: intl.formatMessage({
              id: "balance",
              defaultMessage: "balance",
            }),
          },
        },
        pagination: {
          currentPage: "last",
          recordsPerPage: 10,
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
    ].map(al => intl.formatMessage({ id: al, defaultMessage: al })),
    defaultValues: [
      { inc_exp_type: "Dr" },
      { inc_exp_amount: 0 },
      { inc_exp_plan_amount: 0 },
      { inc_exp_date: moment(new Date()).format("YYYY-MM-DD") },
    ],
    rowKeyUp: "",
    showTooltipFor: ["inc_exp_name", "inc_exp_comments"],
    showTotal: [
      {
        whichKey: "inc_exp_amount",
        forKey: "inc_exp_type",
        forCondition: "equals", // includes or equals
        forValue: [
          { key: "credit", value: "Cr" },
          { key: "debit", value: "Dr" },
        ],
        showDifference: { indexes: [0, 1], showStability: true },
        // Ex:
        // 1. difference result = "Cr - Dr = Balance" Ex: "1000 - 750 = 250"
        // 2. showStability: (Settled), (Ahead), (YetTo) strings will be shown
      },
      {
        whichKey: "inc_exp_plan_amount",
        forKey: "inc_exp_type",
        forCondition: "equals",
        forValue: [
          { key: "credit", value: "Cr" },
          { key: "debit", value: "Dr" },
        ],
        showDifference: { indexes: [0, 1], showStability: true },
      },
    ],
  });

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
      };
      const bankListArray = {
        fetch: {
          dropDownList: bankList,
        },
      };
      const a = getBackendAjax(wClause);
      Promise.all([a])
        .then(async r => {
          setDbData(r[0].data.response);
          setMonthExpenditureConfig({
            ...monthExpenditureConfig,
            ...{
              rowElements: [
                "checkbox",
                "textbox",
                "number",
                "label",
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
              ],
            },
          });
        })
        .finally(() => setLoader(false));
    }
  };

  useEffect(() => {
    calculatePlanning(dbData);
  }, [intl]);

  useEffect(() => {
    getAllApi();
  }, [monthYearSelected, bankSelected, incExpList, bankList]);

  const onReFetchData = () => {
    getAllApi();
  };

  useEffect(() => {
    calculatePlanning(dbData);
  }, [dbData]);

  const getBackendAjax = wClause => {
    const formdata = new FormData();
    formdata.append("TableRows", monthExpenditureConfig.TableRows);
    formdata.append("Table", monthExpenditureConfig.Table);
    if (wClause) {
      formdata.append("WhereClause", wClause);
    }
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id='button-tooltip-1' className='in show' {...rest}>
      {content}
    </Tooltip>
  );

  const calculatePlanning = dbData => {
    const plan = dbData
      .map(data => {
        data.inc_exp_plan_amount = Number(data.inc_exp_plan_amount);
        data.inc_exp_amount = Number(data.inc_exp_amount);
        return data;
      })
      .reduce(
        (a, b) => {
          if (b.inc_exp_type === "Cr") {
            a.incomeTotal += b.inc_exp_amount;
          }
          if (b.inc_exp_type === "Dr") {
            a.expenseTotal += b.inc_exp_amount;
            a.planTotal += b.inc_exp_plan_amount;
          }
          let diff = b.inc_exp_plan_amount / b.inc_exp_amount;
          diff = Number(
            ((diff === Infinity || isNaN(diff) ? 0 : diff) * 100).toFixed(2),
          );
          a.totalPlans.push(diff);
          const rest = {
            percent: diff,
            ...b,
          };
          if (diff === 0) {
            a.noPlans.push(rest);
          }
          if (diff === 100) {
            a.achievedPlans.push(rest);
          }
          if (diff > 100) {
            a.goodPlans.push(rest);
          }
          if (diff < 100 && diff > 0) {
            a.badPlans.push(rest);
          }

          return a;
        },
        {
          planTotal: 0,
          expenseTotal: 0,
          incomeTotal: 0,
          totalPlans: [],
          goodPlans: [],
          badPlans: [],
          noPlans: [],
          achievedPlans: [],
        },
      );

    const totals = [
      {
        amount: plan.incomeTotal,
        label: intl.formatMessage({ id: "income", defaultMessage: "income" }),
        flagString: "success",
      },
      {
        amount: plan.expenseTotal,
        label: intl.formatMessage({ id: "expense", defaultMessage: "expense" }),
        flagString: "info",
      },
      {
        amount: plan.incomeTotal - plan.expenseTotal,
        label: intl.formatMessage({ id: "balance", defaultMessage: "balance" }),
        flagString: "danger",
      },
      {
        amount: plan.planTotal,
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
        planArray: plan.goodPlans,
      },
      {
        key: "achievedPlans",
        flagString: "info",
        planString: intl.formatMessage({
          id: "achievedPlans",
          defaultMessage: "achievedPlans",
        }),
        planArray: plan.achievedPlans,
      },
      {
        key: "badPlans",
        flagString: "danger",
        planString: intl.formatMessage({
          id: "badPlans",
          defaultMessage: "badPlans",
        }),
        planArray: plan.badPlans,
      },
      {
        key: "noPlans",
        flagString: "warning",
        planString: intl.formatMessage({
          id: "noPlans",
          defaultMessage: "noPlans",
        }),
        planArray: plan.noPlans,
      },
    ];
    setPlanCards(cards);
  };

  const getPlanAmount = planArray =>
    planArray.reduce(
      (x, y) => x + (y.inc_exp_plan_amount - y.inc_exp_amount),
      0,
    );

  const exportToPdf = () => {
    const body = dbData.map(
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
      helpers.lacSeperator(getPlanAmount(plan.planArray)),
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
    if (status) {
      response && data && data.response
        ? accountContext.renderToast({
            message: intl.formatMessage({
              id: "transactionSavedSuccessfully",
              defaultMessage: "transactionSavedSuccessfully",
            }),
          })
        : accountContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "noFormChangeFound",
              defaultMessage: "noFormChangeFound",
            }),
          });
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
            size='lg'
            animation={false}
            srcArr={monthExpenditureConfig.rowElements[7].fetch.dropDownList}
            incExpList={
              monthExpenditureConfig.rowElements[6].fetch.dropDownList
            }
            centered
          />
        )}
      <div className=''>
        {!loader && dbData.length > 0 && (
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
                          className='fa fa-arrows-h roundedButton pull-right'
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
                          className='fa fa-file-pdf-o roundedButton pull-right'
                        />
                      </OverlayTrigger>
                    </div>
                    <CsvDownloader
                      datas={helpers.stripCommasInCSV(dbData)}
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
                        <i className='fa fa-file-excel-o roundedButton pull-right' />
                      </OverlayTrigger>
                    </CsvDownloader>
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
                          className='fa fa-text-width roundedButton pull-right'
                        />
                      </OverlayTrigger>
                    </div>
                  </div>
                </>
              )}
            </div>
            <BackendCore
              key={"expTable"}
              config={monthExpenditureConfig.config}
              Table={monthExpenditureConfig.Table}
              TableRows={monthExpenditureConfig.TableRows}
              TableAliasRows={monthExpenditureConfig.TableAliasRows}
              rowElements={monthExpenditureConfig.rowElements}
              showTotal={monthExpenditureConfig.showTotal}
              rowKeyUp={monthExpenditureConfig.rowKeyUp}
              dbData={dbData}
              postApiUrl='/account_planner/postAccountPlanner'
              onPostApi={response => onPostApi(response)}
              // insertCloneData={insertData}
              showTooltipFor={monthExpenditureConfig.showTooltipFor}
              defaultValues={monthExpenditureConfig.defaultValues}
              onTableUpdate={data => {
                calculatePlanning(data);
              }}
              onReFetchData={onReFetchData}
              cellWidth={[4, 13, 11, 11, 13, 13, 13, 13, 13, 10]}
              ajaxButtonName={intl.formatMessage({
                id: "submit",
                defaultMessage: "submit",
              })}
              appIdKeyValue={{
                key: "inc_exp_appId",
                value: userContext.userConfig.appId,
              }}
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
                              className={`superScript text-${plan.flagString}`}
                            >
                              {plan.planArray.length}
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
                              getPlanAmount(plan.planArray),
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
        {!loader && !dbData.length && (
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

MonthExpenditureTable.propTypes = {
  property: PropTypes.string,
};
MonthExpenditureTable.defaultProps = {
  property: "String name",
};

export default injectIntl(MonthExpenditureTable);
