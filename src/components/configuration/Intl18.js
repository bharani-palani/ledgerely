import React, { useContext, useState, useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import BackendCore from "../../components/configuration/backend/BackendCore";
import apiInstance from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { Dropdown } from "react-bootstrap";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";

const Intl18 = props => {
  const intl = useIntl();
  const [masterData, setMasterData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [uniqueLocaleLists, setUniqueLocaleLists] = useState([]);
  const [selectedLocaleId, setSelectedLocaleId] = useState("");
  const [loader, setLoader] = useState(false);
  const [cLoader, setcLoader] = useState(false);
  const userContext = useContext(UserContext);

  const loaderComp = () => {
    return (
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
    );
  };

  const master = {
    config: {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
      },
      footer: {
        total: {},
        pagination: {
          currentPage: "first",
          recordsPerPage: 10,
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
      },
      footer: {
        total: {},
        pagination: {
          currentPage: "first",
          recordsPerPage: 10,
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

  useEffect(() => {
    getMaster();
  }, []);

  const getMaster = () => {
    setMasterData([]);
    setLoader(true);
    const a = getFromTable(master);
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
        rows.length > 0 ? setMasterData(rows) : setMasterData(defaultData);
        rows.length > 0
          ? setSelectedLocaleId(rows[0].locale_id)
          : setSelectedLocaleId("");
      })
      .catch(() => {
        setMasterData([]);
      })
      .finally(() => setLoader(false));
  };

  const getFromTable = (t, wClause) => {
    const formdata = new FormData();
    formdata.append("TableRows", t.TableRows);
    formdata.append("Table", t.Table);
    if (wClause) {
      formdata.append("WhereClause", wClause);
    }
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const getChild = () => {
    setChildData([]);
    setcLoader(true);
    getFromTable(child, `locale_ref_id = ${selectedLocaleId}`)
      .then(async r => {
        r.data.response.length > 0
          ? setChildData(r.data.response)
          : setChildData(defaultData);
      })
      .catch(() => {
        setChildData([]);
      })
      .finally(() => setcLoader(false));
  };

  useEffect(() => {
    if (selectedLocaleId) {
      getChild();
    }
  }, [selectedLocaleId]);

  const onPostApi = response => {
    const { status, data } = response;
    if (status) {
      response && data && data.response
        ? (userContext.renderToast({
            message: intl.formatMessage({
              id: "transactionSavedSuccessfully",
              defaultMessage: "transactionSavedSuccessfully",
            }),
          }),
          getMaster())
        : userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "noFormChangeFound",
              defaultMessage: "noFormChangeFound",
            }),
          });
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

  return (
    <div className='pt-10'>
      {masterData.length > 0 && !loader ? (
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
            onReFetchData={() => {
              getMaster();
              getChild();
            }}
            cellWidth={[4, 13, 13, 13, 13, 13]}
            ajaxButtonName={intl.formatMessage({
              id: "submit",
              defaultMessage: "submit",
            })}
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
                ? masterData.filter(f => f.locale_id === selectedLocaleId)[0]
                    .locale_label
                : intl.formatMessage({
                    id: "selectLanguage",
                    defaultMessage: "selectLanguage",
                  })}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {masterData.map((d, i) => (
                <Dropdown.Item
                  onClick={e => setSelectedLocaleId(d.locale_id)}
                  key={i}
                >
                  {d.locale_label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        loaderComp()
      )}
      {childData.length > 0 && !cLoader ? (
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
            onReFetchData={() => getChild()}
            cellWidth={[4, 13, 13, 13]}
            ajaxButtonName={intl.formatMessage({
              id: "submit",
              defaultMessage: "submit",
            })}
          />
        </>
      ) : (
        loaderComp()
      )}
    </div>
  );
};

export default Intl18;
