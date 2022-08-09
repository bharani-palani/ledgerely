/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import helpers from '../../helpers';
import CsvDownloader from 'react-csv-downloader';
import { UserContext } from "../../contexts/UserContext";

const AmortizationCalculator = props => {
    const userContext = useContext(UserContext);
    const now = helpers.getNow();
    const { ...rest } = props;

    const allLoc = {
        USD: 'en-US',
        INR: 'en-IN',
    }
    const columns = [
        { displayName: 'Month', id: 'index' },
        { displayName: 'Emi', id: 'emi' },
        { displayName: 'Loan', id: 'bal' },
        { displayName: 'Interest', id: 'int' },
        { displayName: 'Principle', id: 'princ' },
    ];
    const localeList = ['INR', 'USD'];
    const [loanState, setLoanState] = useState({
        decimalPoint: 0,
        locale: 'INR',
        minAmount: 100000,
        maxAmount: 10000000,
        amount: 100000,
        minTenure: 1,
        maxTenure: 20,
        tenure: 1,
        minRoi: 1,
        maxRoi: 36,
        roi: 6.7,
    });
    const [payment, setPayment] = useState(0);
    const [table, setTable] = useState([]);

    useEffect(() => {
        const point = loanState.decimalPoint > -1 ? loanState.decimalPoint : 0;
        const roi = (loanState.roi / 100) / 12;
        const tenure = Math.ceil(loanState.tenure * 12);
        const amt = loanState.amount;
        const pay = Number(pmt(roi, tenure, amt).toFixed(point));
        setPayment(pay);
    }, [loanState])

    const onChangeLoanState = (key, value) => {
        setLoanState(ev => ({
            ...ev,
            [key]: value,
        }))
    };

    useEffect(() => {
        const point = loanState.decimalPoint > -1 ? loanState.decimalPoint : 0;
        const roi = (loanState.roi / 100) / 12;
        const tenure = Number(loanState.tenure) > 0 ? Math.ceil(loanState.tenure * 12) : 1;
        const amt = loanState.amount;
        const emi = Number(Math.abs(pmt(roi, tenure, amt)).toFixed(point));

        let [princ, int, bal] = [0, 0, amt];
        const tbl = new Array(tenure).fill(1).map((_, i) => {
            bal = Number((i === 0 ? bal : bal - princ).toFixed(point));
            int = Number((bal * (loanState.roi / 100) / 12).toFixed(point));
            princ = Number((emi - int).toFixed(point));
            return {
                index: i + 1,
                emi,
                int,
                princ,
                bal
            }
        })
        setTable(tbl)
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
        const point = loanState.decimalPoint > -1 ? loanState.decimalPoint : 0;
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
                <Col md="2" className="p-3">Loan amount</Col>
                <Col md="8">
                    <Slider
                        value={loanState.amount}
                        min={loanState.minAmount}
                        max={loanState.maxAmount}
                        onChange={value => onChangeLoanState('amount', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' value={loanState.amount} onChange={o => onChangeLoanState('amount', Number(o.target.value))} placeholder="Loan amount" /></Col>
                <Col md="2" className="p-3">Years</Col>
                <Col md="8">
                    <Slider
                        value={loanState.tenure}
                        min={loanState.minTenure}
                        max={loanState.maxTenure}
                        onChange={value => onChangeLoanState('tenure', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' value={loanState.tenure} onChange={o => onChangeLoanState('tenure', Number(o.target.value))} placeholder="Tenure years" /></Col>
                <Col md="2" className="p-3">Interest</Col>
                <Col md="8">
                    <Slider
                        value={loanState.roi}
                        min={loanState.minRoi}
                        max={loanState.maxRoi}
                        onChange={value => onChangeLoanState('roi', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' value={loanState.roi} onChange={o => onChangeLoanState('roi', Number(o.target.value))} placeholder="Interest" /></Col>
                <Col md="2" className="p-3">Decimals</Col>
                <Col md="8">
                    <Slider
                        value={loanState.decimalPoint}
                        min={0}
                        max={4}
                        onChange={value => onChangeLoanState('decimalPoint', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" className='form-control-sm' value={loanState.decimalPoint} onChange={o => onChangeLoanState('decimalPoint', Number(o.target.value))} placeholder="Decimals" /></Col>
                <Col md="2" className="p-3">Currency</Col>
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
            <div className='py-2 pe-1 pull-right'>
                <CsvDownloader
                    datas={helpers.stripCommasInCSV(table)}
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
            </div>
            <Table striped bordered variant={`${userContext.userData.theme === 'dark' ? 'dark' : 'light'}`}>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Loan</th>
                        <th>Interest</th>
                        <th>Principle</th>
                    </tr>
                    <tr>
                        <th className='text-center'></th>
                        <th>Total</th>
                        <th className='text-danger'>{getTotal('int')}</th>
                        <th className='text-success'>{getTotal('princ')}</th>
                    </tr>
                </thead>
                <tbody>
                    {table.length > 0 && table.map((t, i) => (
                        <tr key={i}>
                            <td>{i + 1}. <span className='pull-right'>{Math.abs(payment).toLocaleString(allLoc[loanState.locale])}</span></td>
                            <td>{t.bal.toLocaleString(allLoc[loanState.locale])}</td>
                            <td>{t.int.toLocaleString(allLoc[loanState.locale])}</td>
                            <td>{t.princ.toLocaleString(allLoc[loanState.locale])}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}


export default AmortizationCalculator;