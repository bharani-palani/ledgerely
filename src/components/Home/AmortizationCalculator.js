/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Table } from "react-bootstrap";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const AmortizationCalculator = props => {
    const [loanState, setLoanState] = useState({
        decimalPoint: 0,
        minAmount: 100000,
        maxAmount: 10000000,
        amount: 4983810,
        minTenure: 1,
        maxTenure: 20,
        tenure: 9.89,
        minRoi: 1,
        maxRoi: 36,
        roi: 6.7,
    });
    const [payment, setPayment] = useState(0);
    const [table, setTable] = useState([]);

    useEffect(() => {
        const roi = (loanState.roi / 100) / 12;
        const tenure = Math.ceil(loanState.tenure * 12);
        const amt = loanState.amount;
        const pay = Number(pmt(roi, tenure, amt).toFixed(loanState.decimalPoint));
        setPayment(pay);
    }, [loanState])

    const onChangeLoanState = (key, value) => {
        setLoanState(ev => ({
            ...ev,
            [key]: value,
        }))
    };

    useEffect(() => {
        const roi = (loanState.roi / 100) / 12;
        const tenure = Math.ceil(loanState.tenure * 12);
        const amt = loanState.amount;
        const emi = Number(Math.abs(pmt(roi, tenure, amt)).toFixed(loanState.decimalPoint));

        let [princ, int, bal] = [0, 0, amt];
        const tbl = new Array(tenure).fill(1).map((_, i) => {
            int = Number((bal * (loanState.roi / 100) / 12).toFixed(loanState.decimalPoint));
            princ = Number((emi - int).toFixed(loanState.decimalPoint));
            bal = Number((bal > emi ? bal - princ : 0).toFixed(loanState.decimalPoint));
            return {
                emi,
                int,
                princ,
                bal
            }
        })
        console.log('bbb', table);
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

    return (
        <div>
            <b><u>Amortization Calculator</u></b>
            <Row>
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
                <Col md="2"><Form.Control type="number" value={loanState.amount} onChange={o => onChangeLoanState('amount', Number(o.target.value))} placeholder="Loan amount" /></Col>
                <Col md="2" className="p-3">Tenure</Col>
                <Col md="8">
                    <Slider
                        value={loanState.tenure}
                        min={loanState.minTenure}
                        max={loanState.maxTenure}
                        onChange={value => onChangeLoanState('tenure', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" value={loanState.tenure} onChange={o => onChangeLoanState('tenure', Number(o.target.value))} placeholder="Tenure years" /></Col>
                <Col md="2" className="p-3">ROI</Col>
                <Col md="8">
                    <Slider
                        value={loanState.roi}
                        min={loanState.minRoi}
                        max={loanState.maxRoi}
                        onChange={value => onChangeLoanState('roi', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" steps="0.1" value={loanState.roi} onChange={o => onChangeLoanState('roi', Number(o.target.value))} placeholder="Interest" /></Col>
                <Col md="2" className="p-3">Decimal Point</Col>
                <Col md="8">
                    <Slider
                        value={loanState.decimalPoint}
                        min={0}
                        max={4}
                        onChange={value => onChangeLoanState('decimalPoint', value)}
                        tooltip={false}
                    />
                </Col>
                <Col md="2"><Form.Control type="number" value={loanState.decimalPoint} onChange={o => onChangeLoanState('decimalPoint', Number(o.target.value))} placeholder="Decimals" /></Col>
            </Row>
            <h6>{payment}</h6>
            <Table striped bordered variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Principle</th>
                        <th>Interest</th>
                        <th>Principle</th>
                    </tr>
                </thead>
                <tbody>
                    {table.length > 0 && table.map((t, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{t.bal}</td>
                            <td>{t.int}</td>
                            <td>{t.princ}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}


export default AmortizationCalculator;