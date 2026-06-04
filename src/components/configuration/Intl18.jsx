import React, { useContext, useState, useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import BackendCore from "../../components/configuration/backend/BackendCore";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { Dropdown } from "react-bootstrap";
import Loader from "../resuable/Loader";
import OffCanvas from "../shared/OffCanvas";

const Intl18 = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const [masterData, setMasterData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [uniqueLocaleLists, setUniqueLocaleLists] = useState([]);
  const [selectedLocaleId, setSelectedLocaleId] = useState("");
  const [loader, setLoader] = useState(false);
  const [cLoader, setcLoader] = useState(false);
  const userContext = useContext(UserContext);
  const defApiParam = {
    start: 0,
    limit: 10,
    searchString: "",
  };
  const [apiParams, setApiParams] = useState(defApiParam);
  const [apiChildParams, setApiChildParams] = useState(defApiParam);
  const t = {
    id: "internationalization",
    label: intl.formatMessage({
      id: "internationalization",
      defaultMessage: "internationalization",
    }),
    help: {
      heading: intl.formatMessage({
        id: "internationalization",
        defaultMessage: "internationalization",
      }),
      points: [
        intl.formatMessage({
          id: "indentOfIntlForm",
          defaultMessage: "indentOfIntlForm",
        }),
        intl.formatMessage({
          id: "pleaseDonotEditIntlKey",
          defaultMessage: "pleaseDonotEditIntlKey",
        }),
        intl.formatMessage({
          id: "updateTheValuesCorrespondingYourLocales",
          defaultMessage: "updateTheValuesCorrespondingYourLocales",
        }),
        intl.formatMessage({
          id: "submitTheFormToSaveChanges",
          defaultMessage: "submitTheFormToSaveChanges",
        }),
      ],
    },
  };

  const loaderComp = () => {
    return (
      <div className='relativeSpinner'>
        <Loader />
      </div>
    );
  };

  const master = {
    config: {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
        searchable: true,
      },
      footer: {
        total: {},
        pagination: {
          currentPage: "first",
          maxPagesToShow: 5,
        },
      },
    },
    id: "intlMaster",
    Table: "locale_master",
    label: "Locale master",
    TableRows: [
      "locale_id",
      "locale_label",
      "locale_string",
      "locale_language",
      "locale_currency",
      "locale_sort",
    ],
    TableAliasRows: [
      intl.formatMessage({ id: "id", defaultMessage: "id" }),
      intl.formatMessage({ id: "localeLabel", defaultMessage: "localeLabel" }),
      intl.formatMessage({
        id: "localeString",
        defaultMessage: "localeString",
      }),
      intl.formatMessage({
        id: "localeLanguage",
        defaultMessage: "localeLanguage",
      }),
      intl.formatMessage({
        id: "localeCurrency",
        defaultMessage: "localeCurrency",
      }),
      intl.formatMessage({ id: "sort", defaultMessage: "sort" }),
    ],
    defaultValues: [{ locale_sort: 1 }],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textbox",
      "textbox",
      "number",
    ],
  };
  const child = {
    config: {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
        searchable: true,
      },
      footer: {
        total: {},
        pagination: {
          currentPage: "first",
          maxPagesToShow: 5,
        },
      },
    },
    id: "intlChild",
    Table: "locale_child",
    label: "Locale child",
    TableRows: ["loc_id", "locale_ref_id", "locale_key", "locale_value"],
    TableAliasRows: [
      intl.formatMessage({ id: "id", defaultMessage: "id" }),
      intl.formatMessage({
        id: "localeLanguage",
        defaultMessage: "localeLanguage",
      }),
      intl.formatMessage({ id: "id", defaultMessage: "id" }),
      intl.formatMessage({ id: "value", defaultMessage: "value" }),
    ],
    defaultValues: [],
    rowElements: [
      "checkbox",
      {
        fetch: {
          dropDownList: uniqueLocaleLists,
        },
      },
      "label",
      "textbox",
    ],
  };
  const defaultData = [
    {
      locale_id: "",
      locale_label: "",
      locale_string: "",
      locale_language: "",
      locale_currency: "",
      locale_sort: "",
    },
  ];

  const getMaster = () => {
    setMasterData([]);
    setLoader(true);
    const a = getFromTable(
      master,
      null,
      apiParams.limit,
      apiParams.start,
      apiParams.searchString,
    );
    const b = apiInstance.get("/getUniqueLocales");
    Promise.all([a, b])
      .then(r => {
        const rows = r[0].data.response;
        const uLocaleLists = r[1].data.response.map(d => ({
          checked: false,
          id: d.locale_id,
          value: d.locale_label,
        }));
        setUniqueLocaleLists(uLocaleLists);
        rows?.table?.length > 0
          ? setMasterData(rows)
          : setMasterData(defaultData);
        rows.length > 0
          ? setSelectedLocaleId(rows[0].locale_id)
          : setSelectedLocaleId("");
      })
      .catch(() => {
        setMasterData([]);
      })
      .finally(() => setLoader(false));
  };

  const getFromTable = (t, wClause, limit, start, searchString) => {
    const formdata = new FormData();
    formdata.append("TableRows", t.TableRows);
    formdata.append("limit", limit);
    formdata.append("start", start);
    formdata.append("searchString", searchString);
    formdata.append("Table", t.Table);
    if (wClause) {
      formdata.append("WhereClause", wClause);
    }
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const getChild = () => {
    setChildData([]);
    setcLoader(true);
    getFromTable(
      child,
      `locale_ref_id = ${selectedLocaleId}`,
      apiChildParams.limit,
      apiChildParams.start,
      apiChildParams.searchString,
    )
      .then(async r => {
        r?.data?.response?.table?.length > 0
          ? setChildData(r.data.response)
          : setChildData({ table: defaultData });
      })
      .catch(() => {
        setChildData([]);
      })
      .finally(() => setcLoader(false));
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

  const onChangeParams = obj => {
    setApiParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    getMaster();
  }, [apiParams]);

  const onChangeChildParams = obj => {
    console.log("bbb", obj);
    setApiChildParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    if (selectedLocaleId) {
      getChild();
    }
  }, [selectedLocaleId, apiChildParams]);

  return (
    <section className={`container-fluid`}>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-4`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-globe fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage
                id='internationalization'
                defaultMessage='internationalization'
              />
            </div>
          </div>
          <OffCanvas
            className={`text-center ${
              userContext.userData.theme === "dark"
                ? "bg-dark text-white-50"
                : "bg-white text-black"
            }`}
            btnValue="<i class='fa fa-question-circle' />"
            btnClassName={`pe-3 btn btn-sm ${
              userContext.userData.theme === "dark" ? "text-white" : "text-dark"
            }`}
            placement='end'
            key={t.id}
            label={t.help.heading}
          >
            {t.help.points.length > 0 && (
              <ul className={`list-group list-group-flush`}>
                {t.help.points.map((point, j) => (
                  <li
                    key={j}
                    className={`list-group-item border-bottom-0 ${
                      userContext.userData.theme === "dark"
                        ? "bg-dark text-white-50"
                        : "bg-white text-black"
                    }`}
                    dangerouslySetInnerHTML={{ __html: point }}
                  ></li>
                ))}
              </ul>
            )}
          </OffCanvas>
        </div>
      </div>
      {loader && loaderComp()}
      <div className='pt-10'>
        {masterData?.table?.length > 0 && !loader && (
          <>
            <h5>
              <FormattedMessage id='masterTable' defaultMessage='masterTable' />
            </h5>
            <h6>
              <FormattedMessage id='note' defaultMessage='note' />
            </h6>
            <ul>
              <li className='small'>
                <FormattedMessage id='youCanStillDuplicateLocales' />
              </li>
            </ul>
            <BackendCore
              key={"lcale-master-table"}
              config={master.config}
              Table={master.Table}
              TableRows={master.TableRows}
              TableAliasRows={master.TableAliasRows}
              rowElements={master.rowElements}
              defaultValues={master.defaultValues}
              dbData={masterData}
              postApiUrl='/account_planner/postAccountPlanner'
              onPostApi={response => onPostApi(response)}
              apiParams={apiParams}
              onChangeParams={obj => onChangeParams(obj)}
              onReFetchData={() => {
                getMaster();
                getChild();
              }}
              cellWidth={[4, 13, 13, 13, 13, 5]}
              ajaxButtonName={intl.formatMessage({
                id: "submit",
                defaultMessage: "submit",
              })}
              theme={userContext.userData.theme}
            />
            <h5>
              <FormattedMessage id='childTable' defaultMessage='childTable' />
            </h5>
            <div className='fst-italic'>
              <h6>
                <FormattedMessage id='note' defaultMessage='note' />
              </h6>
              <ul>
                <li className='small'>
                  <FormattedMessage
                    id='pleaseDonotEditIntlKey'
                    defaultMessage='pleaseDonotEditIntlKey'
                  />
                </li>
                <li className='small'>
                  <FormattedMessage
                    id='indentOfIntlForm'
                    defaultMessage='indentOfIntlForm'
                  />
                </li>
              </ul>
            </div>
            <Dropdown className='pb-3'>
              <Dropdown.Toggle className='btn btn-bni'>
                {selectedLocaleId
                  ? masterData?.table?.filter(
                      f => f.locale_id === selectedLocaleId,
                    )[0].locale_label
                  : intl.formatMessage({
                      id: "selectLanguage",
                      defaultMessage: "selectLanguage",
                    })}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {masterData?.table?.map((d, i) => (
                  <Dropdown.Item
                    onClick={() => setSelectedLocaleId(d.locale_id)}
                    key={i}
                  >
                    {d.locale_label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
        {cLoader && loaderComp()}
        {childData?.table?.length > 0 && !cLoader && (
          <>
            <BackendCore
              key={"lcale-master-table"}
              config={child.config}
              Table={child.Table}
              TableRows={child.TableRows}
              TableAliasRows={child.TableAliasRows}
              rowElements={child.rowElements}
              defaultValues={child.defaultValues}
              dbData={childData}
              postApiUrl='/account_planner/postAccountPlanner'
              onPostApi={response => onPostApi(response)}
              apiParams={apiChildParams}
              onChangeParams={obj => onChangeChildParams(obj)}
              onReFetchData={() => getChild()}
              cellWidth={[4, 13, 13, 13]}
              ajaxButtonName={intl.formatMessage({
                id: "submit",
                defaultMessage: "submit",
              })}
              theme={userContext.userData.theme}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Intl18;
