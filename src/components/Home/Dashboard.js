import React, { useContext, useEffect, useState } from "react";
import apiInstance from "../../services/apiServices";
import { AccountContext } from "../accountPlanner/AccountPlanner";
import { UserContext } from "../../contexts/UserContext";
import { Col, Row, Card } from "react-bootstrap";
import { DonutChart } from "../shared/D3";
import { FormattedMessage, useIntl } from "react-intl";
import helpers from "../../helpers";

const Dashboard = props => {
  const intl = useIntl();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const [bankList, setBankList] = useState([]);
  const [ccOutstandingList, setCcOutstandingList] = useState([]);
  const [totalHoldings, setTotalHoldings] = useState([]);

  const getTotal = (array, key) =>
    array.length > 0
      ? array.reduce((a, b) => {
          return Number(a) + Number(b[key]) || 0;
        }, 0)
      : 0;

  const multiTotal = () => {
    const grouped = _.chain(bankList)
      .groupBy(item => `${item.Currency}{-}${item.Locale}`)
      .map((value, key) => ({
        currency: key.split("{-}")[0],
        locale: key.split("{-}")[1],
        data: value,
      }))
      .value();
    return grouped;
  };

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("/account_planner/getTotalHoldings", formdata)
      .then(res => {
        console.log("bbb", res.data.response.result);
        setBankList(res.data.response.result.bankBalance);
        setCcOutstandingList(res.data.response.result.creditBalance);
      })
      .catch(() => {
        accountContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      });
  }, []);

  useEffect(() => {
    const mTotal = multiTotal();
    console.log("bbb", mTotal);
    setTotalHoldings(mTotal);
  }, [bankList]);

  const NoContent = () => (
    <div className='dashboardCard bni-bg d-flex align-items-center rounded'>
      <div className='text-center w-100'>
        <FormattedMessage
          id='noRecordsGenerated'
          defaultMessage='noRecordsGenerated'
        />
      </div>
    </div>
  );
  return (
    <div className=''>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-pie-chart fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='dashboard' defaultMessage='dashboard' />
            </div>
          </div>
        </div>
      </div>
      <Row>
        <Col md={6}>
          <div className='fs-6 py-2'>Bank holdings</div>
          {bankList.length > 0 ? (
            <div className='x-scroll pb-2'>
              <div
                className=''
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${bankList.length}, 250px)`,
                  columnGap: "5px",
                }}
              >
                {bankList.map((bank, i) => (
                  <Card
                    key={i}
                    className='bni-border bni-border-all dashboardCard'
                  >
                    <Card.Body className='bni-bg rounded-top text-center'>
                      <i className='fa fa-3x fa-bank' />
                      <div className='fs-6 py-1'>
                        <span className='badge bg-dark'>{bank.Bank}</span>
                      </div>
                      <div className='small'>{bank.BankAccountNumber}</div>
                    </Card.Body>
                    <Card.Body>
                      {helpers.countryCurrencyLacSeperator(
                        bank.Locale,
                        bank.Currency,
                        Number(bank.Balance, 2),
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <NoContent />
          )}
        </Col>
        <Col md={3}>
          <div className='fs-6 py-2'>Total holdings</div>
          {totalHoldings.length > 0 ? (
            <div>
              {totalHoldings.length > 1 ? (
                <div className='y-scroll max-h-12 pe-2 py-1'>
                  {totalHoldings.map((hold, i) => (
                    <Card
                      key={i}
                      className={`bni-border bni-border-all bni-border-all-1 mb-2`}
                    >
                      <Card.Body className='bni-bg rounded-top p-2'>
                        <i className='fa fa-1x fa-cubes pe-2' />
                        {hold.currency}
                      </Card.Body>
                      <Card.Body className='p-2 rounded-bottom'>
                        {helpers.lacSeperator(
                          getTotal(hold.data, "Balance"),
                          hold.locale,
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className='bni-border bni-border-all dashboardCard'>
                  <Card.Body className='bni-bg rounded-top text-center'>
                    <div className='d-flex align-items-center justify-content-center h-100'>
                      <div className='fs-6 py-1'>
                        <i className='fa fa-3x fa-cubes d-block' />
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Body className='text-center p-5'>
                    {helpers.countryCurrencyLacSeperator(
                      totalHoldings[0].locale,
                      totalHoldings[0].currency,
                      getTotal(totalHoldings[0].data, "Balance"),
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>
          ) : (
            <NoContent />
          )}
        </Col>
        <Col md={3}>
          <div className='fs-6 py-2'>Credit card outstanding</div>
          {ccOutstandingList.length > 0 ? (
            <div className='y-scroll max-h-12 pe-2 py-1'>
              {ccOutstandingList.map((ccOut, i) => (
                <Card
                  key={i}
                  className={`bni-border bni-border-all bni-border-all-1 mb-2`}
                >
                  <Card.Body className='bni-bg rounded-top p-2'>
                    {ccOut.cardName}
                  </Card.Body>
                  <Card.Body className='p-2 rounded-bottom'>
                    {helpers.countryCurrencyLacSeperator(
                      ccOut.Locale,
                      ccOut.Currency,
                      ccOut.total,
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <NoContent />
          )}
        </Col>
      </Row>
      <div className='fs-6 py-2'>Oct 2023: Top 10</div>
      <Row>
        <Col xl={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={350}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Credits"}
            showLegend={true}
            showTooltip={true}
            fillColor={["#c2d82e", "#000"]}
          />
        </Col>
        <Col xl={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={350}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Debits"}
            showLegend={true}
            showTooltip={true}
          />
        </Col>
        <Col xl={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={350}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Credit card outstanding"}
            showLegend={true}
            showTooltip={true}
          />
        </Col>
        <Col xl={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={350}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Credit card payments"}
            showLegend={true}
            showTooltip={true}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
