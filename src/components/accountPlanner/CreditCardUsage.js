import React, { useRef, useEffect, useState, useContext } from 'react';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import _ from 'lodash';
import moment from 'moment';
import helpers from '../../helpers';
import { FormattedMessage, injectIntl } from 'react-intl'
import { LocaleContext } from '../../contexts/LocaleContext';

const CreditCardUsage = props => {
    const localeContext = useContext(LocaleContext);
    const { ccMonthYearSelected, ccDetails, data, onCcMonthYearSelected, intl } = props;
    const [width, setWidth] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [toggleChart, setToggleChart] = useState(true);
    const ref = useRef(null);
    const interestLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-danger');;
    const purchasesLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-success');
    const paidLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');
    const openingLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-warning');
    const [dateRanges, setDateRanges] = useState({});

    useEffect(() => {
        const [smonth, year] = ccMonthYearSelected.split('-');
        const month = helpers.strToNumMonth[smonth];
        const ccStartDay = Number(ccDetails.credit_card_start_date);
        const ccEndDay = Number(ccDetails.credit_card_end_date);

        const eDate = new Date(
            `${Number(year)}-${Number(month)}-${ccEndDay}`.replace(/-/g, '/')
        );
        const eDateStr = `${eDate.getFullYear()}-${helpers.leadingZeros(
            eDate.getMonth() + 1
        )}-${helpers.leadingZeros(eDate.getDate())}`;

        const dateOffset = 24 * 60 * 60 * 1000 * 30; // 30 days
        let sDate = eDate.setTime(eDate.getTime() - dateOffset);
        sDate = new Date(sDate);
        sDate = new Date(sDate.setDate(ccStartDay));
        const sDateStr = `${sDate.getFullYear()}-${helpers.leadingZeros(
            sDate.getMonth() + 1
        )}-${helpers.leadingZeros(sDate.getDate())}`;

        let payDate = Number(ccDetails.credit_card_payment_date);
        payDate = payDate < 10 ? `0${payDate}` : payDate;
        payDate = new Date(`${payDate}-${ccMonthYearSelected}`);
        payDate = helpers.addMonths(payDate, 1);
        let [yyyy, mmm, dd] = [
            payDate.getFullYear(),
            payDate.getMonth() + 1,
            payDate.getDate(),
        ];
        mmm = mmm < 10 ? `0${mmm}` : mmm;
        dd = dd < 10 ? `0${dd}` : dd;
        payDate = `${yyyy}-${mmm}-${dd}`;

        setDateRanges({ sDateStr, eDateStr, payDate });
        console.log('bbb', { sDateStr, eDateStr, payDate })

        setWidth(ref.current.clientWidth)
    }, []);

    const massageData = (where) => {
        return _.flatten(data.map((d, i) => (
            d.cData.filter(f => f.label.includes(where)).map((t, j) => ({
                x: moment(d.month.replace(/-/g, " 01, ")).format('YYYY-MM-DD'),
                y: Number(t.value.toFixed(2)),
                month: d.month,
            }))
        )))
    }
    const getTotal = (where) => {
        let num = massageData(where).reduce((a, b) => a + Number(b.y.toFixed(2)), 0);
        num = helpers.countryCurrencyLacSeperator(
            localeContext.localeLanguage,
            localeContext.localeCurrency,
            num,
            2
        )
        return num;
    }

    useEffect(() => {
        const cData = [{
            color: interestLineColor,
            points: massageData('Taxes & Interest')
        }, {
            color: purchasesLineColor,
            points: massageData('Purchases')
        }, {
            color: paidLineColor,
            points: massageData('Paid')
        }, {
            color: openingLineColor,
            points: massageData('Opening Balance')
        }];
        setChartData([]);
        setTimeout(() => {
            setChartData(cData);
        }, 1);
    }, [data, intl]);

    const getMonthLocale = (r) => {
        let date = "";
        if (width > 400) {
            date = moment(r).format('MMM');;
            const first = date.toLocaleString('default', { month: "short" }).toLowerCase();
            date = intl.formatMessage({ id: first })
        } else {
            date = moment(r).format('M');
        }
        return date;
    }

    return (
        <div ref={ref}>
            <i
                className={`fa fa-${toggleChart ? "minus" : "plus"}-circle rounded-circle icon-bni cursor-pointer`}
                onClick={() => setToggleChart(!toggleChart)}
            />
            {toggleChart && chartData.length > 0 &&
                <>
                    <div className='row rounded'>
                        <div className='col-md-3 small d-flex justify-content-between align-items-center'>
                            <span><FormattedMessage id="year" /> {data[0].month.split('-')[1]}</span>
                            <i className={`fa fa-circle text-warning me-1`} />
                            <span><FormattedMessage id="openingBalance" /></span>
                        </div>
                        <div className='col-md-3 small d-flex justify-content-between align-items-center'>
                            <span><FormattedMessage id="purchases" /></span>
                            <span><i className='fa fa-circle text-success' /></span>
                            <span>{`${getTotal('Purchases')}`}</span>
                        </div>
                        <div className='col-md-3 small d-flex justify-content-between align-items-center'>
                            <span><FormattedMessage id="payments" /></span>
                            <span><i className='fa fa-circle text-primary' /></span>
                            <span>{`${getTotal('Paid')}`}</span>
                        </div>
                        <div className='col-md-3 small d-flex justify-content-between align-items-center'>
                            <span><FormattedMessage id="taxesAndInterest" /></span>
                            <span><i className='fa fa-circle text-danger' /></span>
                            <span>{`${getTotal('Taxes & Interest')}`}</span>
                        </div>
                    </div>
                    <LineChart
                        data={chartData}
                        id="credit-card-usage-1"
                        margins={{ top: 50, right: width > 400 ? 80 : 30, bottom: 50, left: 80 }}
                        width={width}
                        isDate={true}
                        height={250}
                        xLabel={intl.formatMessage({ id: 'month' })}
                        yLabel={intl.formatMessage({ id: 'transaction' })}
                        onPointHover={d => helpers.countryCurrencyLacSeperator(
                            localeContext.localeLanguage,
                            localeContext.localeCurrency,
                            d.y,
                            2
                        )}
                        tooltipClass={`line-chart-tooltip`}
                        ticks={data.length}
                        xDisplay={(r, i) => {
                            return getMonthLocale(r);
                        }}
                        onPointClick={(e, c) => onCcMonthYearSelected(c.month)}
                    />
                    {ccMonthYearSelected && dateRanges && ccDetails && dateRanges.payDate && (
                        <>
                            <div className="row mt-10">
                                <div className="col-md-3 small d-flex justify-content-evenly">
                                    <span><FormattedMessage id="month" /></span>
                                    <span>{getMonthLocale(new Date(ccMonthYearSelected))}</span>
                                </div>
                                <div className="col-md-3 small d-flex justify-content-evenly">
                                    <span><FormattedMessage id="cardNumber" /></span>
                                    <span>{ccDetails.credit_card_number}</span>
                                </div>
                                <div className="col-md-3 small d-flex justify-content-evenly align-items-center">
                                    <span><FormattedMessage id="cycle" /></span>
                                    <span>{dateRanges.sDateStr}</span>
                                    <span><FormattedMessage id="to" /></span>
                                    <span>{dateRanges.eDateStr}</span>
                                </div>
                                <div className="col-md-3 small d-flex justify-content-evenly">
                                    <span><FormattedMessage id="payDate" /></span>
                                    <span>{dateRanges.payDate}</span>
                                </div>
                            </div>
                        </>
                    )}
                </>
            }
        </div>)
}

export default injectIntl(CreditCardUsage);