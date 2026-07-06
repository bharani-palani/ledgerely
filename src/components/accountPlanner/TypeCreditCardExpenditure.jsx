import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { creditCardConfig } from "../configuration/backendTableConfig";
import BackendCore from "../../components/configuration/backend/BackendCore";
import helpers from "../../helpers";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";
import { AccountContext } from "./AccountPlanner";
import { UserContext } from "../../contexts/UserContext";
import CreditCardModal from "./CreditCardModal";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import { useQuery } from "../GlobalHeader/queryParamHook";
import moment from "moment";
import { db } from "../../services/indexedDb";

const TypeCreditCardExpenditure = props => {
  const { apiInstance } = useAxios();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const { intl } = props;
  const { ccMonthYearSelected, setCcMonthYearSelected, ccBankSelected, ccDetails, incExpList, ccBankList } = accountContext;

  const [openCreditCardModal, setOpenCreditCardModal] = useState(false); // change to false
  const [dbData, setDbData] = useState({});
  const [loader, setLoader] = useState(false);
  const [insertCloneData, setInsertCloneData] = useState([]);
  const defApiParam = {
    start: 0,
    limit: 10,
    searchString: "",
  };
  const [apiParams, setApiParams] = useState(defApiParam);
  const [ccConfig, setCcConfig] = useState(creditCardConfig);

  const { sDateStr, eDateStr } = useMemo(() => {
    const ccStartDay = Number(ccDetails.credit_card_start_date);
    const ccEndDay = Number(ccDetails.credit_card_end_date);

    // Parse the month-year (e.g., "Jul-2026") and create end date
    const eDate = moment(ccMonthYearSelected, "MMM-YYYY").date(ccEndDay);
    const eDateStr = eDate.format("YYYY-MM-DD");

    // Calculate start date by subtracting 30 days from end date, then set start day
    const sDate = moment(eDate).subtract(30, "days").date(ccStartDay);
    const sDateStr = sDate.format("YYYY-MM-DD");

    return { sDateStr, eDateStr };
  }, [ccMonthYearSelected, ccDetails]);

  const isSelectedMonthPreviousOrCurrent = useCallback(() => {
    const inputDate = moment(ccMonthYearSelected, "MMM-YYYY", true);
    if (!inputDate.isValid()) return false;

    const currentMonth = moment().startOf("month");
    const previousMonth = moment().subtract(1, "month").startOf("month");
    const isFutureMonth = moment(inputDate).isAfter();

    return inputDate.isSame(currentMonth, "month") || inputDate.isSame(previousMonth, "month") || isFutureMonth;
  }, [ccMonthYearSelected]);

  const incExpListDropDownObject = useMemo(
    () => ({
      fetch: {
        dropDownList: incExpList.map(({ id, value }) => ({ id, value })),
      },
      searchable: true,
      showAsLabel: !isSelectedMonthPreviousOrCurrent(),
    }),
    [incExpList, isSelectedMonthPreviousOrCurrent()],
  );

  const ccBankListDropDownObject = useMemo(
    () => ({
      fetch: {
        dropDownList: ccBankList.map(({ id, value }) => ({ id, value })),
      },
      searchable: true,
      showAsLabel: !isSelectedMonthPreviousOrCurrent(),
    }),
    [ccBankList, isSelectedMonthPreviousOrCurrent()],
  );

  const status = useMemo(
    () => ({
      fetch: {
        dropDownList: [
          { checked: false, id: "1", value: "Settled" },
          { checked: false, id: "0", value: "Pending" },
          { checked: false, id: "2", value: "Part payment" },
        ],
      },
      showAsLabel: !isSelectedMonthPreviousOrCurrent(),
    }),
    [isSelectedMonthPreviousOrCurrent()],
  );

  const renderEditableTable = useCallback(() => {
    const isPreviousOrCurrent = isSelectedMonthPreviousOrCurrent();
    setCcConfig(prev => [
      {
        ...prev[0],
        rowElements: [
          ...(isPreviousOrCurrent ? ["checkbox"] : []),
          isPreviousOrCurrent ? "textbox" : "label",
          isPreviousOrCurrent ? "date" : "label",
          isPreviousOrCurrent ? "number" : "label",
          isPreviousOrCurrent ? "number" : "label",
          isPreviousOrCurrent ? "number" : "label",
          isPreviousOrCurrent ? "number" : "label",
          "label",
          ccBankListDropDownObject,
          incExpListDropDownObject,
          status,
          isPreviousOrCurrent ? "textbox" : "label",
          "relativeTime",
        ].filter(Boolean),
        TableAliasRows: [
          ...(isPreviousOrCurrent ? ["id"] : []),
          "transaction",
          "date",
          "openingBalance",
          "credits",
          "purchases",
          "taxesAndInterest",
          "balance",
          "creditCard",
          "category",
          "status",
          "comments",
          "recorded",
        ]
          .filter(Boolean)
          .map(al => intl.formatMessage({ id: al, defaultMessage: al })),
        TableRows: [
          ...(isPreviousOrCurrent ? ["cc_id"] : []),
          "cc_transaction",
          "cc_date",
          "cc_opening_balance",
          "cc_payment_credits",
          "cc_purchases",
          "cc_taxes_interest",
          "cc_expected_balance",
          "cc_for_card",
          "cc_inc_exp_cat",
          "cc_transaction_status",
          "cc_comments",
          "cc_added_at",
        ].filter(Boolean),
        cellWidth: [...(isPreviousOrCurrent ? [4] : []), 13, 8, 8, 8, 8, 8, 8, 13, 13, 13, 13, 10].filter(Boolean),
        defaultValues: [
          { cc_for_card: ccBankSelected },
          { cc_transaction_status: "0" },
          { cc_date: sDateStr },
          ...prev[0].defaultValues.filter(item => {
            const key = Object.keys(item)[0];
            return !["cc_for_card", "cc_transaction_status", "cc_date"].includes(key);
          }),
        ],
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
              locale: ccDetails.credit_card_locale,
              currency: ccDetails.credit_card_currency,
              maxDecimal: 2,
            },
            pagination: {
              currentPage: "first",
              maxPagesToShow: 5,
            },
          },
          dateSelection: {
            minDate: moment(sDateStr).toDate(),
            maxDate: moment(eDateStr).toDate(),
          },
        },
        showTooltipFor: isPreviousOrCurrent ? ["cc_transaction", "cc_comments"] : [],
      },
    ]);
  }, [
    isSelectedMonthPreviousOrCurrent(),
    intl,
    ccBankListDropDownObject,
    incExpListDropDownObject,
    status,
    sDateStr,
    eDateStr,
    ccBankSelected,
    ccDetails,
    apiParams,
  ]);

  const getAllApi = useCallback(() => {
    const wClause = `a.cc_date between "${sDateStr}" and "${eDateStr}" and a.cc_for_card = ${ccBankSelected}`;
    setDbData({});
    setLoader(true);
    const a = getBackendAjax(wClause);
    Promise.all([a])
      .then(async r => {
        setInsertCloneData([]);
        let data = r[0].data.response;
        setDbData(data);
        renderEditableTable();
        const isPreviousOrCurrent = isSelectedMonthPreviousOrCurrent();
        if (isPreviousOrCurrent) {
          await db.creditCardTransactionTable.clear();
          await db.creditCardTransactionTable.bulkPut(data.table);
          const rest = helpers.deletePropertyFromObject(data, "table");
          await db.apiCache.put({ key: "creditCardTransactionTable", value: rest, updatedAt: moment().format("YYYY-MM-DD HH:mm:ss") });
        }
      })
      .catch(async () => {
        const list = await db.creditCardTransactionTable.toArray();
        const cache = await db.apiCache.get("creditCardTransactionTable");
        if (cache) {
          const localDbDate = moment(list[list.length - 1]?.cc_date).format("MMM-YYYY");
          setCcMonthYearSelected(localDbDate);
          renderEditableTable();
          setDbData({ ...cache.value, table: list });
        }
      })
      .finally(() => {
        setLoader(false);
      });
  }, [
    isSelectedMonthPreviousOrCurrent(),
    intl,
    ccBankListDropDownObject,
    incExpListDropDownObject,
    status,
    sDateStr,
    eDateStr,
    ccBankSelected,
    ccDetails,
    apiParams,
  ]);

  const onReFetchData = () => {
    getAllApi();
  };

  const getBackendAjax = useCallback(
    wClause => {
      const formdata = new FormData();
      formdata.append("tenantId", userContext.userConfig.tenantId);
      formdata.append(
        "TableRows",
        ccConfig[0].TableRows.filter(f => f !== "cc_expected_balance"),
      );
      formdata.append("Table", ccConfig[0].Table);
      formdata.append("limit", apiParams.limit);
      formdata.append("start", apiParams.start);
      formdata.append("searchString", apiParams.searchString);
      if (wClause) {
        formdata.append("WhereClause", wClause);
      }
      return apiInstance.post("/account_planner/getAccountPlanner", formdata);
    },
    [apiParams],
  );

  const onPostApi = response => {
    const { status, data, errorMessage } = response;
    if (status === 200) {
      if (response && data && typeof data.response.result === "boolean" && data.response.result !== null && data.response.result) {
        accountContext.renderToast({
          message: intl.formatMessage({
            id: "transactionSavedSuccessfully",
            defaultMessage: "transactionSavedSuccessfully",
          }),
        });
      }
      if (response && data && typeof data.response.result === "boolean" && data.response.result !== null && data.response.result === false) {
        accountContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "noFormChangeFound",
            defaultMessage: "noFormChangeFound",
          }),
        });
      }
      if (response && data && data.response.result === null) {
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: <UpgradeHeading />,
          content: <UpgradeContent />,
        });
      }
    } else {
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: (
          <div>
            <div>Error code: {status}</div>
            <div>{errorMessage}</div>
          </div>
        ),
      });
    }
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id='button-tooltip-1' className='in show' {...props}>
      {content}
    </Tooltip>
  );

  const onChangeParams = obj => {
    setApiParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  const searchParams = useQuery();
  const params = React.useMemo(
    () => ({
      fetch: searchParams.get("fetch"),
      search: searchParams.get("search"),
    }),
    [searchParams],
  );

  useEffect(() => {
    if (params.fetch && params.fetch === "ccTransactions" && params.search) {
      setApiParams({
        ...defApiParam,
        searchString: params.search,
      });
    }
  }, [params]);

  useEffect(() => {
    setApiParams(defApiParam);
  }, [ccMonthYearSelected]);

  useEffect(() => {
    getAllApi();
  }, [apiParams]);

  const onEventListener = useCallback(
    args => {
      const { index, data, dbData } = args;
      if (index?.j === "cc_transaction") {
        const strings = data
          .split(" ")
          .filter(s => s.trim() !== "")
          .map(s => s.toLowerCase());
        const selectedCat = incExpList
          .filter(inc => {
            return strings.some(str => inc?.value?.toLowerCase().includes(str.toLowerCase()));
          })
          .sort((a, b) => {
            let aIndex = -1;
            let bIndex = -1;

            for (const orderString of strings) {
              if (a.value.includes(orderString)) {
                aIndex = strings.indexOf(orderString);
                break;
              }
            }

            for (const orderString of strings) {
              if (b.value.includes(orderString)) {
                bIndex = strings.indexOf(orderString);
                break;
              }
            }

            return aIndex - bIndex;
          })
          .reverse();
        if (selectedCat.length > 0) {
          setDbData(prevDbData => ({
            ...prevDbData,
            table: dbData.map((d, i) => {
              if (i === index.i) {
                return {
                  ...d,
                  cc_inc_exp_cat: selectedCat[0]?.id,
                };
              }
              return d;
            }),
          }));
        }
      }
    },
    [incExpList, dbData],
  );

  return (
    <div className='settings'>
      {openCreditCardModal && (
        <CreditCardModal
          className='creditCardModal'
          show={openCreditCardModal}
          onHide={() => setOpenCreditCardModal(false)}
          size='xl'
          animation={false}
          onImport={data => {
            setInsertCloneData(data);
            setOpenCreditCardModal(false);
          }}
          ccBankSelected={ccBankSelected}
        />
      )}
      <div className=''>
        <div className='row py-2'>
          <div className='col-md-12'>
            <OverlayTrigger
              placement='left'
              delay={{ show: 250, hide: 400 }}
              overlay={renderCloneTooltip(
                props,
                intl.formatMessage({
                  id: "importYourCreditCardStatement",
                  defaultMessage: "importYourCreditCardStatement",
                }),
              )}
              triggerType='hover'
            >
              <i onClick={() => setOpenCreditCardModal(!openCreditCardModal)} className='fa fa-upload roundedButton pull-right' />
            </OverlayTrigger>
          </div>
        </div>
        {loader && (
          <div className='relativeSpinner'>
            <Loader />
          </div>
        )}
        {dbData &&
          Object.keys(dbData)?.length > 0 &&
          dbData?.table?.length > 0 &&
          ccConfig
            .sort((a, b) => a.id > b.id)
            .map((t, i) => (
              <BackendCore
                key={i}
                id={"ccTable"}
                Table={t.Table}
                config={t.config}
                TableRows={t.TableRows}
                TableAliasRows={t.TableAliasRows}
                dbData={dbData}
                rowElements={t.rowElements}
                postApiUrl={isSelectedMonthPreviousOrCurrent() ? "/account_planner/postAccountPlanner" : false}
                onPostApi={response => onPostApi(response)}
                apiParams={apiParams}
                onChangeParams={obj => onChangeParams(obj)}
                showTooltipFor={t.showTooltipFor}
                defaultValues={t.defaultValues}
                onReFetchData={onReFetchData}
                insertCloneData={insertCloneData}
                cellWidth={t.cellWidth}
                ajaxButtonName={intl.formatMessage({
                  id: "submit",
                  defaultMessage: "submit",
                })}
                tenantId={userContext.userConfig.tenantId}
                theme={userContext.userData.theme}
                eventListener={args => onEventListener(args)}
              />
            ))}
      </div>
    </div>
  );
};

export default injectIntl(TypeCreditCardExpenditure);
