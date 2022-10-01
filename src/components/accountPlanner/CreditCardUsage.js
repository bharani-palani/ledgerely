import React, { useRef, useEffect, useState } from 'react';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import _ from 'lodash';
import moment from 'moment';
import helpers from '../../helpers';

const CreditCardUsage = props => {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    const { data } = props;
    const lineColor = document.documentElement.style.getPropertyValue('--app-theme-bg-color');

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, []);

    const massageData = (where) => {
        return _.flatten(data.map((d, i) => (
            d.cData.filter(f => f.label.includes(where)).map((t) => ({
                x: moment(d.month).format('YYYY-MM-DD'),
                y: t.value
            }))
        )))
    }

    const getTotal = (where) => {
        let num = massageData(where).reduce((a, b) => a + b.y, 0);
        num = helpers.indianLacSeperator(num);
        return num;
    }

    const chartData = [{
        color: lineColor,
        name: `Total: ${getTotal('Taxes & Interest')}`,
        points: massageData('Taxes & Interest')
    }];

    return (<div>
        <div ref={ref}>
            <LineChart
                margins={{ top: 50, right: 30, bottom: 50, left: 75 }}
                width={width}
                height={200}
                xLabel="Month"
                yLabel="Interest"
                data={chartData}
                onPointHover={d => d.y}
                tooltipClass={`line-chart-tooltip`}
                legendPosition="top-center"
                showLegends={true}
                isDate={true}
                ticks={chartData[0].points.length}
                interpolate="cardinal"
                xDisplay={e => moment(e).format('MMM YYYY')}
            />
        </div>
    </div>)
}

export default CreditCardUsage;