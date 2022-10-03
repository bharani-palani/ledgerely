import React, { useRef, useEffect, useState } from 'react';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import _ from 'lodash';
import moment from 'moment';
import helpers from '../../helpers';

const CreditCardUsage = props => {
    const { data, onCcMonthYearSelected } = props;
    const [width, setWidth] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [toggleChart, setToggleChart] = useState(true);
    const ref = useRef(null);
    const interestLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-danger');;
    const purchasesLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-success');
    const paidLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');
    const openingLineColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-warning');

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, []);

    const massageData = (where) => {
        return _.flatten(data.map((d, i) => (
            d.cData.filter(f => f.label.includes(where)).map((t) => ({
                x: moment(d.month.replace(/-/g, " 01, ")).format('YYYY-MM-DD'),
                y: Number(t.value.toFixed(2)),
                month: d.month,
            }))
        )))
    }

    const getTotal = (where) => {
        let num = massageData(where).reduce((a, b) => a + Number(b.y.toFixed(2)), 0);
        num = helpers.indianLacSeperator(num);
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
        setChartData(cData);
    }, [data]);

    return (
        <div ref={ref}>
            <>
                <div className='row rounded'>
                    <div className='col-md-3 small'>
                        <i
                            className={`fa fa-${toggleChart ? "minus" : "plus"}-circle text-warning cursor-pointer me-1`}
                            onClick={() => setToggleChart(!toggleChart)}
                        />
                        Opening Blance
                    </div>
                    <div className='col-md-3 small'><i className='fa fa-circle text-danger' /> {`Taxes & Interest ${getTotal('Taxes & Interest')}`}</div>
                    <div className='col-md-3 small'><i className='fa fa-circle text-success' /> {`Purchases ${getTotal('Purchases')}`}</div>
                    <div className='col-md-3 small'><i className='fa fa-circle text-primary' /> {`Paid ${getTotal('Paid')}`}</div>
                </div>
                {toggleChart && chartData.length > 0 &&
                    <LineChart
                        data={chartData}
                        id="credit-card-usage-1"
                        margins={{ top: 50, right: 25, bottom: 50, left: 80 }}
                        width={width}
                        isDate={true}
                        height={250}
                        xLabel="Month"
                        yLabel="Transactions"
                        onPointHover={d => d.y}
                        tooltipClass={`line-chart-tooltip`}
                        ticks={chartData[0].points.length}
                        xDisplay={r => moment(new Date(r)).format('MMM YYYY')}
                        onPointClick={(e, c) => onCcMonthYearSelected(c.month)}
                    />}
            </>
        </div>)
}

export default CreditCardUsage;