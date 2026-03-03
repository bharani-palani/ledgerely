import React, { useState, useContext, useEffect } from "react";
import { Tooltip, OverlayTrigger, Container } from "react-bootstrap";
import BackendCore from "../configuration/backend/BackendCore";
import { crudFormArray } from "../configuration/backendTableConfig";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../contexts/GlobalContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import CsvDownloader from "react-csv-downloader";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import PageHeader from "../shared/PageHeader";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

const Schedules = props => {
  const { apiInstance } = useAxios();
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
  const [totals, setTotals] = useState({ totalSchedules: 0, monthlWise: 0, yearWise: 0, everyMonth: 0 });
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
    formdata.append("WhereClause", `temp_appId = '${userContext.userConfig.appId}'`);
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onToggle = async t => {
    setDbData([]);
    setLoader(true);
    const a = getBackendAjax(t.Table, t.TableRows);
    Promise.all([a])
      .then(async r => {
        r[0].data.response?.table?.length > 0 ? setDbData(r[0].data.response) : setDbData({ table: defaultData[t.Table] });
      })
      .finally(() => setLoader(false));
  };

  const LoaderComp = () => {
    return (
      <div className='relativeSpinner middle'>
        <Loader />
      </div>
    );
  };
  const onPostApi = response => {
    const { status, data } = response;
    if (status === 200) {
      if (response && data && typeof data.response === "boolean" && data.response !== null && data.response) {
        userContext.renderToast({
          message: intl.formatMessage({
            id: "transactionSavedSuccessfully",
            defaultMessage: "transactionSavedSuccessfully",
          }),
        });
      }
      if (response && data && typeof data.response === "boolean" && data.response !== null && data.response === false) {
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
      if (response && data && typeof data.response === "object" && data.response !== null) {
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
    incExpTemp: ["id", "name", "amount", "type", "date", "month", "year", "category", "bank"],
  };

  const dayArray = new Array(31).fill("_").map((_, i) => ({
    id: String(i + 1),
    value: String(i + 1),
  }));

  const monthArray = [
    ...[{ id: "0", value: "Every month" }],
    ...new Array(12).fill("_").map((_, i) => ({
      id: String(i + 1),
      value: moment().month(i).format("MMM"),
    })),
  ];

  const yearArray = [
    ...[{ id: "0", value: "Every year" }],
    ...new Array(5).fill("_").map((_, i) => ({
      id: moment().add(i, "years").format("YYYY"),
      value: moment().add(i, "years").format("YYYY"),
    })),
  ];

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
      {
        fetch: {
          dropDownList: dayArray,
          searchable: true,
        },
      },
      {
        fetch: {
          dropDownList: monthArray,
          searchable: true,
        },
      },
      {
        fetch: {
          dropDownList: yearArray,
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
      crud.TableAliasRows = alias[crud.id].map(al => intl.formatMessage({ id: al, defaultMessage: al }));
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

  const getSchedulesCount = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/account_planner/getScheduleTotals", formdata);
  };

  useEffect(() => {
    getSchedulesCount().then(r => {
      const { totalSchedules, monthlWise, yearWise, everyMonth } = r.data.response;
      setTotals({ totalSchedules, monthlWise, yearWise, everyMonth });
    });
  }, []);

  const onEventListener = args => {
    if (args?.event === "onSubmit") {
      getSchedulesCount().then(r => {
        const { totalSchedules, monthlWise, yearWise, everyMonth } = r.data.response;
        setTotals({ totalSchedules, monthlWise, yearWise, everyMonth });
      });
    }
  };
  const CountCard = ({ array }) => {
    return (
      <Row className='mb-5'>
        {array.length > 0 &&
          array.map(item => {
            const { title, count } = item;
            return (
              <Col lg={3} md={6} sm={6} key={title}>
                <Row
                  className={`mx-1 my-2 px-2 py-3 shadow-${userContext.userData.theme} rounded-3 bg-${userContext.userData.theme === "light" ? "white" : "dark"}`}
                >
                  <Col xs={10}>
                    <i className={`fa ${item?.icon} me-2`} />
                    <span>{title}</span>
                  </Col>
                  <Col xs={2} className='p-0'>
                    {count}
                  </Col>
                </Row>
              </Col>
            );
          })}
      </Row>
    );
  };

  return (
    <Container fluid>
      <div className='settings'>
        <PageHeader icon='fa fa-calendar' intlId='schedules'>
          {dbData?.table?.length > 0 && (
            <CsvDownloader datas={helpers.stripCommasInCSV(dbData?.table)} filename={`schedules.csv`} className='d-inline'>
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
                    eventListener={args => onEventListener(args)}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      {/* todo: 
      1. Add intl for english in this file
      4. Add 60 planning options as button dropdown in money planner page.
      */}
      <CountCard
        array={[
          {
            title: intl.formatMessage({
              id: "total",
              defaultMessage: "total",
            }),
            count: totals.totalSchedules,
            icon: "fa-calendar",
          },
          { title: "Month wise", count: totals.monthlWise, icon: "fa-calendar-plus-o" },
          { title: "Yearly wise", count: totals.yearWise, icon: "fa-calendar-o" },
          { title: "Every month", count: totals.everyMonth, icon: "fa-calendar-check-o" },
        ]}
      />
    </Container>
  );
};

export default injectIntl(Schedules);
