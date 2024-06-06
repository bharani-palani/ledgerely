import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Col, Row, Container } from "react-bootstrap";
import apiInstance from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { FormattedMessage, useIntl } from "react-intl";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

const CategoryContext = React.createContext(undefined);

const Categories = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [incExpList, setIncExpList] = useState([]);
  const [selection, setSelection] = useState({
    category: "",
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
  });

  const getIncExpList = async () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/inc_exp_list", formdata)
      .then(res => setIncExpList(res.data.response))
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getIncExpList();
  }, []);

  return (
    <CategoryContext.Provider value={{ incExpList, selection }}>
      <Container>
        <PageHeader icon='fa fa-sitemap' intlId='category' />
        <Row>
          <Col sm={3} className='react-responsive-ajax-data-table'>
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
            className='d-flex align-items-center justify-content-around'
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
            className='d-flex align-items-center justify-content-around'
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
            <button className='btn btn-bni w-100'>
              <FormattedMessage id='submit' defaultMessage='submit' />
            </button>
          </Col>
        </Row>
      </Container>
    </CategoryContext.Provider>
  );
};

export default Categories;
