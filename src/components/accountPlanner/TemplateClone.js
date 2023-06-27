import React, { useContext, useEffect, useState } from "react";
import { monthExpenditureConfig } from "../configuration/backendTableConfig";
import BackendCore from "../../components/configuration/backend/BackendCore";
import { AccountContext } from "./AccountPlanner";
import { FormattedMessage, injectIntl } from "react-intl";

const TemplateClone = props => {
  const { intl } = props;
  const accountContext = useContext(AccountContext);
  const { incExpList, bankList, insertData } = accountContext;
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    const incExpListDropDownObject = {
      fetch: {
        dropDownList: incExpList.map(({ id, value }, i) => ({
          id,
          value,
        })),
      },
    };

    const bankListArray = {
      fetch: {
        dropDownList: bankList,
      },
    };
    monthExpenditureConfig[0].rowElements[6] = incExpListDropDownObject;
    monthExpenditureConfig[0].rowElements[7] = bankListArray;
    monthExpenditureConfig[0].rowElements[4] = {
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
    };
    const searchFor = (array, key) => {
      const row =
        key &&
        array.filter(f => f.value?.toLowerCase().includes(key?.toLowerCase()));
      const id = row.length > 0 ? row[0].id : "";
      return id;
    };

    const backIns = [...insertData].map(o => {
      o.inc_exp_category = searchFor(incExpList, o.inc_exp_category);
      o.inc_exp_bank = searchFor(bankList, o.inc_exp_bank);
      return o;
    });
    setDbData(backIns);
  }, [insertData]);

  const config = monthExpenditureConfig.map(crud => {
    const obj = {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: "total", defaultMessage: "total" }),
          locale: "en",
          currency: "",
          maxDecimal: 2,
          doubleEntryBalanceStrings: {
            zero: intl.formatMessage({
              id: "solved",
              defaultMessage: "solved",
            }),
            plus: intl.formatMessage({ id: "ahead", defaultMessage: "ahead" }),
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
    };
    crud.config = obj;
    crud.TableAliasRows = [
      "id",
      "transaction",
      "amount",
      "plan",
      "type",
      "date",
      "category",
      "bank",
      "comments",
    ].map(al => intl.formatMessage({ id: al, defaultMessage: al }));
    crud.showTotal = [
      {
        whichKey: "inc_exp_amount",
        forKey: "inc_exp_type",
        forCondition: "equals", // includes or equals
        forValue: [
          { key: "credit", value: "Cr" },
          { key: "debit", value: "Dr" },
        ],
        showDifference: { indexes: [0, 1], showStability: true },
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
    ];
    return crud;
  });

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

  const onReFetchData = () => {
    setDbData([]);
  };

  return (
    dbData.length > 0 && (
      <div>
        <h6>
          <FormattedMessage
            id='cloneFromTemplate'
            defaultMessage='cloneFromTemplate'
          />
        </h6>
        {config
          .sort((a, b) => a.id > b.id)
          .map((t, i) => (
            <BackendCore
              key={i}
              config={t.config}
              Table={t.Table}
              TableRows={t.TableRows}
              TableAliasRows={t.TableAliasRows}
              rowElements={t.rowElements}
              showTotal={t.showTotal}
              rowKeyUp={t.rowKeyUp}
              dbData={dbData}
              postApiUrl='/account_planner/postAccountPlanner'
              onPostApi={response => onPostApi(response)}
              showTooltipFor={t.showTooltipFor}
              defaultValues={t.defaultValues}
              onReFetchData={onReFetchData}
              //   onTableUpdate={data => null}
              cellWidth='12rem'
              ajaxButtonName={intl.formatMessage({
                id: "submit",
                defaultMessage: "submit",
              })}
            />
          ))}
      </div>
    )
  );
};

export default injectIntl(TemplateClone);
