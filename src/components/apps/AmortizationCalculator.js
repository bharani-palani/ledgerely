import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import helpers from '../../helpers';
import CsvDownloader from 'react-csv-downloader';
import { UserContext } from "../../contexts/UserContext";
import DonutChart from 'react-donut-chart';
import { FormattedMessage, useIntl } from 'react-intl';

const AmortizationCalculator = props => {
    const intl = useIntl();
    const userContext = useContext(UserContext);
    const now = helpers.getNow();
    const { ...rest } = props;

    const allLoc = {
        USD: 'en-US',
        INR: 'en-IN',
    }
    const columns = [
        { displayName: 'Month', id: 'index' },
        { displayName: 'EMI', id: 'emi' },
        { displayName: 'Diminishing', id: 'bal' },
        { displayName: 'Interest', id: 'int' },
        { displayName: 'Principle', id: 'princ' },
    ];
    const localeList = ['INR', 'USD'];
    const [loanState, setLoanState] = useState({
        decimalPoint: 0,
        locale: 'INR',
        minAmount: 100000,
        maxAmount: 10000000,
        amount: 1000000,
        minTenure: 0.08,
        maxTenure: 100,
        tenure: 1,
        minRoi: 1,
        maxRoi: 100,
        roi: 8.5,
    });
    const point = loanState.decimalPoint > -1 && loanState.decimalPoint < 5 ? loanState.decimalPoint : 0;
    const [payment, setPayment] = useState(0);
    const [table, setTable] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [exportData, setExportData] = useState([]);

    useEffect(() => {
        const roi = (loanState.roi / 100) / 12;
        const tenure = Math.ceil(loanState.tenure * 12);
        const amt = loanState.amount;
        const pay = Number(pmt(roi, tenure, amt).toFixed(point));
        setPayment(pay);
    }, [loanState])

    const onChangeLoanState = (key, value) => {
        let fValue = value;
        if (['tenure'].includes(key)) {
            fValue = value >= loanState.minTenure && value <= 100 ? value : 0;
        }
        if (['roi'].includes(key)) {
            fValue = value >= 1 && value <= 100 ? value : 1;
        }
        if (['decimalPoint'].includes(key)) {
            fValue = value > 0 && value < 5 ? value : 0;
        }
        setLoanState(ev => ({
            ...ev,
            [key]: fValue
        }))
    };

    useEffect(() => {
        const roi = (loanState.roi / 100) / 12;
        const tenure = Number(loanState.tenure) > 0 ? Math.ceil(loanState.tenure * 12) : 1;
        const amt = loanState.amount;
        const emi = Number(Math.abs(pmt(roi, tenure, amt)).toFixed(point));

        let [princ, int, bal] = [0, 0, amt];
        const tbl = new Array(tenure).fill(1).map((_, i) => {
            bal = Number((i === 0 ? bal : bal - princ));
            int = Number((bal * (loanState.roi / 100) / 12));
            princ = Number((emi - int));
            return {
                index: i + 1,
                emi,
                int,
                princ,
                bal
            }
        })
        setTable(tbl);
        setExportData(tbl.map(t => {
            t.int = t.int.toFixed(point)
            t.bal = t.bal.toFixed(point)
            t.princ = t.princ.toFixed(point)
            t.emi = t.emi.toFixed(point)
            return t;
        }))
        const gData = [
            {
                label: intl.formatMessage({ id: 'principalAmount' }),
                value: (tbl.reduce((a, b) => (Number(a) + Number(b.princ)), 0) / tbl.reduce((a, b) => (Number(a) + Number(b.emi)), 0) * 100),
            },
            {
                label: intl.formatMessage({ id: 'interest' }),
                value: (tbl.reduce((a, b) => (Number(a) + Number(b.int)), 0) / tbl.reduce((a, b) => (Number(a) + Number(b.emi)), 0) * 100),
            },
        ];
        setGraphData(gData)
    }, [loanState]);

    const pmt = (ir, np, pv, fv, type) => {
        /*
         * ir   - interest rate per month
         * np   - number of periods (months)
         * pv   - present value
         * fv   - future value
         * type - when the payments are due:
         *        0: end of the period, e.g. end of month (default)
         *        1: beginning of period
         */
        let [pmt, pvif] = [0, 0];

        fv || (fv = 0);
        type || (type = 0);

        if (ir === 0)
            return -(pv + fv) / np;

        pvif = Math.pow(1 + ir, np);
        pmt = - ir * (pv * pvif + fv) / (pvif - 1);

        if (type === 1)
            pmt /= (1 + ir);

        return pmt;
    }

    const getTotal = (key) => {
        let val = table.reduce((a, b) => (Number(a) + Number(b[key])), 0);
        val = helpers.countryCurrencyLacSeperator(allLoc[loanState.locale], loanState.locale, val, point);
        return val;
    }

    const renderCloneTooltip = (props, content) => (
        <Tooltip id="button-tooltip-1" className="in show" {...rest}>
            {content}
        </Tooltip>
    );

    return (
        <div>
            <Row className='align-items-center'>
                <Col md="2" className="p-3"><FormattedMessage id="loanAmount" /></Col>
                <Col md="8">
                    <Slider
                        value={loanState.amount}
                        step={loanState.minAmount}
                        min={loanState.minAmount}
                        max={loanState.maxAmount}
                        onChange={value => onChangeLoanState('amount', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' value={loanState.amount} onChange={o => onChangeLoanState('amount', Number(o.target.value))} placeholder={intl.formatMessage({ id: 'loanAmount' })} /></Col>
                <Col md="2" className="p-3"><FormattedMessage id="years" /></Col>
                <Col md="8">
                    <Slider
                        value={loanState.tenure}
                        min={loanState.minTenure}
                        max={loanState.maxTenure}
                        onChange={value => onChangeLoanState('tenure', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' min="1" max="100" defaultValue={loanState.tenure} onChange={o => onChangeLoanState('tenure', Number(o.target.value))} placeholder={intl.formatMessage({ id: 'years' })} /></Col>
                <Col md="2" className="p-3"><FormattedMessage id="interest" /></Col>
                <Col md="8">
                    <Slider
                        value={loanState.roi}
                        min={loanState.minRoi}
                        max={loanState.maxRoi}
                        onChange={value => onChangeLoanState('roi', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' value={loanState.roi} onChange={o => onChangeLoanState('roi', Number(o.target.value))} placeholder={intl.formatMessage({ id: 'interest' })} /></Col>
                <Col md="2" className="p-3"><FormattedMessage id="decimals" /></Col>
                <Col md="8">
                    <Slider
                        value={loanState.decimalPoint}
                        min={0}
                        max={4}
                        onChange={value => onChangeLoanState('decimalPoint', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' value={loanState.decimalPoint} onChange={o => onChangeLoanState('decimalPoint', Number(o.target.value))} placeholder={intl.formatMessage({ id: 'decimals' })} /></Col>
                <Col md="2" className="p-3"><FormattedMessage id="currency" /></Col>
                <Col md="10">
                    {localeList.map((l, i) => (
                        <Form.Check
                            key={i}
                            inline
                            name="locale"
                            type={`radio`}
                            id={`default-${i}`}
                            label={l}
                            checked={l === loanState.locale}
                            onChange={o => onChangeLoanState('locale', l)}
                        />
                    ))}
                </Col>
            </Row>
            <Row>
                <Col md={4} className={`p-3 accountPlanner ${userContext.userData.theme === 'dark' ? 'dark' : 'light'}`}>
                    {exportData.length > 0 && <div className='py-2 pe-1 d-inline-block'>
                        <CsvDownloader
                            datas={helpers.stripCommasInCSV(exportData)}
                            filename={`Amortization-table-${now}.csv`}
                            columns={columns}
                        >
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderCloneTooltip(props, 'Export CSV')}
                                triggerType="hover"
                            >
                                <i className="fa fa-file-excel-o roundedButton" />
                            </OverlayTrigger>
                        </CsvDownloader>
                    </div>}
                    {graphData.length > 0 && <div className='text-center'><DonutChart
                        innerRadius={1}
                        outerRadius={0.9}
                        strokeColor={`${userContext.userData.theme === 'dark' ? '#555555' : '#ffffff'}`}
                        colors={['#c2d82e', '#bf3d3d']}
                        height={250}
                        width={250}
                        legend={false}
                        data={graphData}
                    /></div>}
                </Col>
                <Col md={8}>
                    {table.length > 0 && <Table striped bordered variant={`${userContext.userData.theme === 'dark' ? 'dark' : 'light'}`}>
                        <thead>
                            <tr>
                                <th><FormattedMessage id="installments" /></th>
                                <th><FormattedMessage id="interest" /></th>
                                <th><FormattedMessage id="principalAmount" /></th>
                                <th><FormattedMessage id="diminishing" /></th>
                            </tr>
                            <tr className='border-bottom'>
                                <th><FormattedMessage id="total" /> <span className='pull-right'>{getTotal('emi')}</span></th>
                                <th className='text-danger'>{getTotal('int')}</th>
                                <th colSpan={2} className='text-success'>{getTotal('princ')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.length > 0 && table.map((t, i) => (
                                <tr key={i}>
                                    <td>{i + 1}. <span className='pull-right'>{Math.abs(payment).toLocaleString(allLoc[loanState.locale])}</span></td>
                                    <td>{parseFloat(Number(t.int).toFixed(point)).toLocaleString(allLoc[loanState.locale])}</td>
                                    <td>{parseFloat(Number(t.princ).toFixed(point)).toLocaleString(allLoc[loanState.locale])}</td>
                                    <td>{parseFloat(Number(t.bal).toFixed(point)).toLocaleString(allLoc[loanState.locale])}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>}
                </Col>
            </Row>
        </div >
    )
}


export default AmortizationCalculator;