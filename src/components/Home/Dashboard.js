import React, { useContext, useEffect, useState, useRef } from "react";
import apiInstance from "../../services/apiServices";
import { AccountContext } from "../accountPlanner/AccountPlanner";
import { UserContext } from "../../contexts/UserContext";
import { Col, Row, Card } from "react-bootstrap";
import { DonutChart, VerticalBarChart } from "../shared/D3";
import { FormattedMessage, useIntl } from "react-intl";
import moment from "moment";
import helpers from "../../helpers";
import Loader from "react-loader-spinner";

const Dashboard = props => {
  const intl = useIntl();
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const [bankList, setBankList] = useState([]);
  const [ccOutstandingList, setCcOutstandingList] = useState([]);
  const [totalHoldings, setTotalHoldings] = useState([]);
  const [topTrends, setTopTrends] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!loader) {
      setTimeout(() => {
        setWidth(containerRef?.current?.clientWidth);
      }, 1000);
    }
  }, [loader]);

  const refObj = {
    topCategoryCredits: "Category credits",
    topCategoryDebits: "Category debits",
    topTrxCredits: "Trx credits",
    topTrxDebits: "Trx debits",
  };

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

  useEffect(() => {
    const holdingsFormdata = new FormData();
    holdingsFormdata.append("appId", userContext.userConfig.appId);
    const a = apiInstance.post(
      "/account_planner/getTotalHoldings",
      holdingsFormdata,
    );
    const topTrendsFormdata = new FormData();
    topTrendsFormdata.append("appId", userContext.userConfig.appId);
    topTrendsFormdata.append("month", moment().format("M"));
    topTrendsFormdata.append("year", moment().format("YYYY"));
    const b = apiInstance.post("/dashboard/topTrends", topTrendsFormdata);
    const c = apiInstance.post(
      "/dashboard/recentTransactions",
      holdingsFormdata,
    );
    Promise.all([a, b, c])
      .then(res => {
        setBankList(res[0].data.response.result.bankBalance);
        setCcOutstandingList(res[0].data.response.result.creditBalance);
        setTopTrends(res[1].data.response);
        setRecentData(res[2].data.response);
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
      })
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    const mTotal = multiTotal();
    setTotalHoldings(mTotal);
  }, [bankList]);

  useEffect(() => {
    const cData = Object.entries(topTrends).map(top => ({
      width: 250,
      height: 350,
      outerRadius: 100,
      innerRadius: 80,
      xaxisLabel: refObj[top[0]],
      showLegend: false,
      showTooltip: true,
      fillColor: ["#c2d82e", "#000"],
      data: top[1].map(d => ({ label: d.name, value: Number(d.total) })),
    }));
    setChartData(cData);
  }, [topTrends]);

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
  return loader ? (
    <LoaderComp />
  ) : (
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
        <Col lg={12} ref={containerRef}>
          <div className='fs-6 py-2'>
            <FormattedMessage
              id='recentTransactions'
              defaultMessage='recentTransactions'
            />
          </div>
          {width && recentData.length > 0 ? (
            <VerticalBarChart
              width={width}
              height={150}
              data={recentData}
              marginLeft={0}
              marginBottom={0}
              marginTop={0}
              yAxisLabel={intl.formatMessage({
                id: "amount",
                defaultMessage: "amount",
              })}
              xAxisLabel={intl.formatMessage({
                id: "date",
                defaultMessage: "date",
              })}
              showXaxis={false}
              showYaxis={false}
              padding={0.9}
              yTicks={2}
            />
          ) : null}
          {recentData.length === 0 && <NoContent />}
        </Col>
        <Col lg={8} md={6}>
          <div className='fs-6 py-2'>
            <FormattedMessage id='bankHoldings' defaultMessage='bankHoldings' />
          </div>
          {bankList.length > 0 ? (
            <div className='x-scroll pb-2'>
              <div
                className=''
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${bankList.length}, 250px)`,
                  columnGap: "15px",
                }}
              >
                {bankList.map((bank, i) => (
                  <Card
                    key={i}
                    className={`bni-border bni-border-all dashboardCard`}
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
        <Col lg={2} md={3}>
          <div className='fs-6 py-2'>
            <FormattedMessage
              id='totalHoldings'
              defaultMessage='totalHoldings'
            />
          </div>
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
                  <Card.Body className='bni-bg rounded-top text-center p-4'>
                    <div className='d-flex align-items-center justify-content-center h-100 p-3'>
                      <div className='fs-6 py-1'>
                        <i className='fa fa-3x fa-cubes d-block' />
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Body className='text-center'>
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
        <Col lg={2} md={3}>
          <div className='fs-6 py-2'>
            <FormattedMessage
              id='creditCardOutstandingAmount'
              defaultMessage='creditCardOutstandingAmount'
            />
          </div>
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
      <div className='fs-6 py-2'>
        {intl.formatMessage({
          id: moment().format("MMM").toLowerCase(),
          defaultMessage: moment().format("MMM").toLowerCase(),
        })}{" "}
        {moment().format("YYYY")}{" "}
        <FormattedMessage id='topTrends' defaultMessage='topTrends' />
      </div>
      <Row>
        {chartData.map((m, i) => (
          <Col key={i} lg={3} md={6} className='text-center'>
            <DonutChart {...m} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
