import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger, Container } from "react-bootstrap";
import BackendCore from "../../components/configuration/backend/BackendCore";
import { crudFormArray } from "../configuration/backendTableConfig";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../contexts/GlobalContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import CsvDownloader from "react-csv-downloader";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import PageHeader from "../shared/PageHeader";

const CreateModule = props => {
  const { intl } = props;
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "schedules",
    defaultMessage: "schedules",
  })}`;
  const [dbData, setDbData] = useState([]);
  const [loader, setLoader] = useState(false);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const localeContext = useContext(LocaleContext);
  const defApiParam = {
    start: 0,
    limit: 10,
    searchString: "",
  };
  const [apiParams, setApiParams] = useState(defApiParam);
  const defaultData = {
    income_expense_template: [
      {
        template_id: "",
        temp_inc_exp_name: "",
        temp_amount: "0.00",
        temp_inc_exp_type: "Dr",
        temp_inc_exp_date: "1",
        temp_category: "",
        temp_bank: "",
      },
    ],
  };

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    formdata.append("limit", apiParams.limit);
    formdata.append("start", apiParams.start);
    formdata.append("searchString", apiParams.searchString);
    formdata.append(
      "WhereClause",
      `temp_appId = '${userContext.userConfig.appId}'`,
    );
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onToggle = async t => {
    setDbData([]);
    setLoader(true);
    const a = getBackendAjax(t.Table, t.TableRows);
    Promise.all([a])
      .then(async r => {
        r[0].data.response?.table?.length > 0
          ? setDbData(r[0].data.response)
          : setDbData({ table: defaultData[t.Table] });
      })
      .finally(() => setLoader(false));
  };

  const LoaderComp = () => {
    return (
      <div className='relativeSpinner middle'>
        <Loader
          type={helpers.loadRandomSpinnerIcon()}
          color={document.documentElement.style.getPropertyValue(
            "--app-theme-bg-color",
          )}
          height={100}
          width={100}
        />
      </div>
    );
  };
  const onPostApi = (response, id) => {
    const { status, data } = response;
    if (status === 200) {
      if (
        response &&
        data &&
        typeof data.response === "boolean" &&
        data.response !== null &&
        data.response
      ) {
        userContext.renderToast({
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
        userContext.renderToast({
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
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "unableToReachServer",
          defaultMessage: "unableToReachServer",
        }),
      });
    }
  };

  const alias = {
    incExpTemp: ["id", "name", "amount", "type", "date", "category", "bank"],
  };

  const rElements = {
    incExpTemp: [
      "checkbox",
      "textbox",
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
      {
        fetch: {
          dropDownList: new Array(28).fill("_").map((_, i) => ({
            checked: String(i + 1) === "1",
            id: String(i + 1),
            value: String(i + 1),
          })),
          searchable: true,
        },
      },
      "textbox",
      "textbox",
    ],
  };

  const crudFormMassageArray = crudFormArray
    .filter(f => f.id === "incExpTemp")
    .map(crud => {
      const obj = {
        header: {
          searchPlaceholder: intl.formatMessage({
            id: "searchHere",
            defaultMessage: "searchHere",
          }),
          searchable: true,
        },
        footer: {
          total: {
            locale: localeContext.localeLanguage,
            currency: localeContext.localeCurrency,
            maxDecimal: 2,
          },
          pagination: {
            currentPage: "last",
            maxPagesToShow: 5,
          },
        },
      };
      crud.config = obj;
      crud.TableAliasRows = alias[crud.id].map(al =>
        intl.formatMessage({ id: al, defaultMessage: al }),
      );
      crud.rowElements = rElements[crud.id];
      return crud;
    });

  const appIdRef = {
    incExpTemp: "temp_appId",
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id={`button-tooltip-${Math.random()}`} className='in show'>
      {content}
    </Tooltip>
  );

  const onChangeParams = obj => {
    setApiParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    onToggle(crudFormArray.filter(f => f.id === "incExpTemp")[0]);
  }, [apiParams]);

  return (
    <Container fluid>
      <div className='settings'>
        <PageHeader icon='fa fa-calendar' intlId='schedules'>
          {dbData?.table?.length > 0 && (
            <CsvDownloader
              datas={helpers.stripCommasInCSV(dbData?.table)}
              filename={`schedules.csv`}
              className='d-inline'
            >
              <OverlayTrigger
                placement='left'
                delay={{ show: 250, hide: 400 }}
                overlay={renderCloneTooltip(
                  props,
                  intl.formatMessage({
                    id: "download",
                    defaultMessage: "download",
                  }),
                )}
                triggerType='hover'
              >
                <i className={`fa fa-download pe-3`} />
              </OverlayTrigger>
            </CsvDownloader>
          )}
        </PageHeader>
        {loader && <LoaderComp />}
        {crudFormMassageArray
          .sort((a, b) => a.id - b.id)
          .map((t, i) => (
            <div key={i}>
              {dbData?.table?.length > 0 && (
                <div className='pt-2'>
                  <div className='text-end'></div>
                  <BackendCore
                    key={i}
                    className='pt-2'
                    config={t.config}
                    Table={t.Table}
                    TableRows={t.TableRows}
                    TableAliasRows={t.TableAliasRows}
                    rowElements={t.rowElements}
                    defaultValues={t.defaultValues}
                    dbData={dbData}
                    postApiUrl='/account_planner/postAccountPlanner'
                    onPostApi={response => onPostApi(response, t.id)}
                    apiParams={apiParams}
                    onChangeParams={obj => onChangeParams(obj)}
                    onReFetchData={() => onToggle(t)}
                    cellWidth={t.cellWidth}
                    ajaxButtonName={intl.formatMessage({
                      id: "submit",
                      defaultMessage: "submit",
                    })}
                    appIdKeyValue={{
                      key: appIdRef[t.id],
                      value: userContext.userConfig.appId,
                    }}
                    theme={userContext.userData.theme}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </Container>
  );
};

CreateModule.propTypes = {
  property: PropTypes.string,
};
CreateModule.defaultProps = {
  property: "String name",
};

export default injectIntl(CreateModule);
