import React, { useCallback, useContext, useEffect, useState } from "react";
import { templateConfig } from "../configuration/backendTableConfig";
import BackendCore from "../../components/configuration/backend/BackendCore";
import { AccountContext } from "./AccountPlanner";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";

const TemplateClone = props => {
  const { apiInstance } = useAxios();
  const { intl, scheduleMonth } = props;
  const [year, month] = scheduleMonth.split("-");
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const { incExpList, bankList, insertData } = accountContext;
  const [dbData, setDbData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [templateState, setTemplateState] = useState(templateConfig);
  const incExpListDropDownObject = {
    fetch: {
      dropDownList: incExpList.map(({ id, value }) => ({
        id,
        value,
      })),
    },
    searchable: true,
  };
  const bankListArray = {
    fetch: {
      dropDownList: bankList,
    },
    searchable: true,
  };

  const getTemplate = useCallback(() => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    formdata.append("monthYear", scheduleMonth);
    return apiInstance
      .post("/account_planner/getIncExpTemplate", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  }, [scheduleMonth]);

  const cloneFromTemplate = useCallback(() => {
    setLoader(true);
    accountContext.setInsertData([]);
    const a = getTemplate();
    Promise.all([a])
      .then(r => {
        const data = r[0];
        const ins = data
          .map(({ temp_inc_exp_name, temp_amount, temp_inc_exp_type, temp_inc_exp_date, temp_category, temp_bank }) => {
            return {
              inc_exp_id: "",
              inc_exp_name: temp_inc_exp_name,
              inc_exp_amount: 0,
              inc_exp_plan_amount: temp_amount,
              inc_exp_type: temp_inc_exp_type,
              inc_exp_date: moment({ year, month: Number(month) - 1 })
                .date(temp_inc_exp_date)
                .format("YYYY-MM-DD"),
              inc_exp_category: temp_category,
              inc_exp_bank: temp_bank,
              inc_exp_comments: "",
            };
          })
          .sort((a, b) => new Date(a.inc_exp_date.replace(/-/g, "/")) - new Date(b.inc_exp_date.replace(/-/g, "/")));
        accountContext.setInsertData(ins);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [scheduleMonth]);

  useEffect(() => {
    cloneFromTemplate();
  }, [intl, scheduleMonth]);

  useEffect(() => {
    const rowElements = [
      "checkbox",
      "textbox",
      "number",
      "number",
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
              localeId: "credit",
            },
            {
              label: intl.formatMessage({
                id: "debit",
                defaultMessage: "debit",
              }),
              value: "Dr",
              checked: true,
              localeId: "debit",
            },
          ],
        },
      },
      "date",
      incExpListDropDownObject,
      bankListArray,
      "textbox",
    ];
    let date = moment({ year, month: Number(month) - 1 }).startOf("month");
    const allDays = date.daysInMonth();
    const config = {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
        searchable: false,
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: "total", defaultMessage: "total" }),
          locale: "en",
          currency: "",
          maxDecimal: 2,
        },
        pagination: {
          currentPage: "last",
          maxPagesToShow: 5,
        },
      },
      dateSelection: {
        minDate: moment({ year, month: Number(month) - 1, date: 1 }).toDate(),
        maxDate: moment({ year, month: Number(month) - 1, date: allDays }).toDate(),
      },
    };

    const TableAliasRows = ["id", "transaction", "amount", "plan", "type", "date", "category", "bank", "comments"].map(al =>
      intl.formatMessage({ id: al, defaultMessage: al }),
    );

    setTemplateState(prev => ({
      ...prev,
      config,
      TableAliasRows,
      rowElements,
    }));

    const searchFor = (array, key) => {
      const row = key && array.filter(f => f.value?.toLowerCase().includes(key?.toLowerCase()));
      const id = row.length > 0 ? row[0].id : "";
      return id;
    };

    const backIns = [...insertData].map(o => {
      o.inc_exp_category = searchFor(incExpList, o.inc_exp_category);
      o.inc_exp_bank = searchFor(bankList, o.inc_exp_bank);
      return o;
    });

    const credit = backIns.filter(f => f.inc_exp_type === "Cr").reduce((a, c) => Number(a) + Number(c.inc_exp_plan_amount), 0);
    const debit = backIns.filter(f => f.inc_exp_type === "Dr").reduce((a, c) => Number(a) + Number(c.inc_exp_plan_amount), 0);
    const balance = credit - debit;
    const obj = {
      table: backIns,
      total: {
        inc_exp_plan_amount: [
          {
            value: credit,
            prefix: "",
            suffix: "(+)",
          },
          {
            value: debit,
            prefix: "",
            suffix: "(-)",
          },
          {
            value: balance,
            prefix: "",
            suffix: "(=)",
            className: "rounded bni-bg text-dark p-1",
          },
        ],
      },
    };
    setDbData(obj);
  }, [insertData, intl, year, month]);

  const onPostApi = response => {
    const { status, data } = response;
    if (status === 200) {
      if (response && data && typeof data.response === "boolean" && data.response !== null && data.response) {
        accountContext.renderToast({
          message: intl.formatMessage({
            id: "transactionSavedSuccessfully",
            defaultMessage: "transactionSavedSuccessfully",
          }),
        });
      }
      if (response && data && typeof data.response === "boolean" && data.response !== null && data.response === false) {
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

  const onReFetchData = () => {
    setDbData([]);
  };

  const onChangeParams = () => {};

  return (
    <div>
      {dbData?.table?.length > 0 && (
        <div>
          <h6>
            <span className='pe-1'>
              <FormattedMessage id='plan' defaultMessage='plan' />
            </span>
            <spam>
              <FormattedMessage
                id={moment({ year, month: Number(month) - 1 })
                  .format("MMM")
                  .toLowerCase()}
                defaultMessage={moment({ year, month: Number(month) - 1 })
                  .format("MMM")
                  .toLowerCase()}
              />{" "}
              {moment({ year, month: Number(month) - 1 }).format("YYYY")}
            </spam>
          </h6>
          <BackendCore
            config={templateState.config}
            Table={templateState.Table}
            TableRows={templateState.TableRows}
            TableAliasRows={templateState.TableAliasRows}
            rowElements={templateState.rowElements}
            dbData={dbData}
            postApiUrl='/account_planner/postAccountPlanner'
            onPostApi={response => onPostApi(response)}
            onChangeParams={obj => onChangeParams(obj)}
            showTooltipFor={templateState.showTooltipFor}
            defaultValues={templateState.defaultValues}
            onReFetchData={onReFetchData}
            cellWidth={[4, 13, 10, 10, 13, 10, 13, 13, 13]}
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
        </div>
      )}
      {loader && (
        <div className='relativeSpinner'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default injectIntl(TemplateClone);
