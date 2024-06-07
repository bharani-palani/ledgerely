import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Col, Row, Container } from "react-bootstrap";
import apiInstance from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { FormattedMessage, useIntl } from "react-intl";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import BackendCore from "../../components/configuration/backend/BackendCore";

const CategoryContext = React.createContext(undefined);

const Categories = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [loader, setLoader] = useState(true);
  const [incExpList, setIncExpList] = useState([]);
  const [selection, setSelection] = useState({
    category: "60",
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
  });
  const [bankData, setBankData] = useState([]);

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
    Table: "categorizedBankTrx",
    label: "Locale master",
    TableRows: ["name", "date", "amount", "type", "comments"],
    TableAliasRows: [
      intl.formatMessage({ id: "name", defaultMessage: "name" }),
      intl.formatMessage({
        id: "date",
        defaultMessage: "date",
      }),
      intl.formatMessage({
        id: "amount",
        defaultMessage: "amount",
      }),
      intl.formatMessage({
        id: "type",
        defaultMessage: "type",
      }),
      intl.formatMessage({ id: "comments", defaultMessage: "comments" }),
    ],
    defaultValues: [],
    rowElements: ["label", "label", "label", "label", "label"],
  };

  const getIncExpList = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/inc_exp_list", formdata)
      .then(res => setIncExpList(res.data.response))
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  };

  const getCatBankTable = () => {
    const formdata = new FormData();
    formdata.append(
      "TableRows",
      `a.inc_exp_name as name,a.inc_exp_date as date, a.inc_exp_amount as amount, a.inc_exp_type as type, a.inc_exp_comments as comments`,
    );
    formdata.append("Table", "categorizedBankTrx");
    formdata.append(
      "WhereClause",
      `a.inc_exp_appId = '${
        userContext.userConfig.appId
      }' && b.inc_exp_cat_id = '${selection.category}' && d.bank_appId = '${
        userContext.userConfig.appId
      }' && a.inc_exp_date >= '${moment(selection.startDate)
        .format("YYYY-MM-DD")
        .toString()}' && a.inc_exp_date <= '${moment(selection.endDate)
        .format("YYYY-MM-DD")
        .toString()}'`,
    );
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onGenerate = () => {
    setBankData([]);
    setTimeout(() => {
      getCatBankTable()
        .then(r => setBankData(r.data.response))
        .catch(e => console.log("bbb", e));
    }, 100);
  };

  useEffect(() => {
    getIncExpList();
  }, []);

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

  return (
    <CategoryContext.Provider value={{ incExpList, selection }}>
      <Container>
        <PageHeader icon='fa fa-sitemap' intlId='category' />
        {loader ? (
          <LoaderComp />
        ) : (
          <Row>
            <Col sm={3} className='react-responsive-ajax-data-table pb-2'>
              <FilterSelect
                placeholder={intl.formatMessage({
                  id: "select",
                  defaultMessage: "select",
                })}
                onChange={(ind, value, pKey) => {
                  setSelection(prev => ({ ...prev, category: value }));
                }}
                element={{
                  fetch: {
                    dropDownList: incExpList.map(row => ({
                      id: row.id,
                      value: row.value,
                    })),
                  },
                }}
                value={selection.category}
                type={"single"}
                searchable={true}
                theme={userContext.userData.theme}
              />
            </Col>
            <Col
              sm={3}
              className='d-flex align-items-center justify-content-between pb-2'
            >
              <span>
                <FormattedMessage id='startDate' defaultMessage='startDate' />
              </span>
              <DateTimePicker
                className='bg-white text-dark'
                value={selection.startDate}
                format='yyyy-MM-dd'
                clearIcon={null}
                onChange={value => {
                  setSelection(prev => ({ ...prev, startDate: value }));
                }}
              />
            </Col>
            <Col
              sm={3}
              className='d-flex align-items-center justify-content-between pb-2'
            >
              <span>
                <FormattedMessage id='endDate' defaultMessage='endDate' />
              </span>
              <DateTimePicker
                className='bg-white text-dark'
                value={selection.endDate}
                format='yyyy-MM-dd'
                clearIcon={null}
                onChange={value => {
                  setSelection(prev => ({ ...prev, endDate: value }));
                }}
              />
            </Col>
            <Col sm={3}>
              <button
                className='btn btn-sm btn-bni w-100'
                onClick={() => onGenerate()}
              >
                <FormattedMessage id='generate' defaultMessage='generate' />
              </button>
            </Col>
          </Row>
        )}
        {bankData.length > 0 && (
          <BackendCore
            key={"cat-bank-table"}
            config={master.config}
            Table={master.Table}
            TableRows={master.TableRows}
            TableAliasRows={master.TableAliasRows}
            rowElements={master.rowElements}
            defaultValues={master.defaultValues}
            dbData={bankData}
            cellWidth={[20, 10, 10, 5, 20]}
            ajaxButtonName={intl.formatMessage({
              id: "submit",
              defaultMessage: "submit",
            })}
            theme={userContext.userData.theme}
          />
        )}
      </Container>
    </CategoryContext.Provider>
  );
};

export default Categories;
