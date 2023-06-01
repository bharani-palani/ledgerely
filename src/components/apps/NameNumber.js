import React, { useState, useContext } from 'react';
import { Row, Col, Table } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from 'react-intl';

const NameNumber = props => {
    const intl = useIntl();
    const userContext = useContext(UserContext);
    const [name, setName] = useState("");
    const [info, setInfo] = useState({});

    const calculate = () => {
        const mapStr = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            0: 0,
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5,
            f: 6,
            g: 7,
            h: 8,
            i: 9,
            j: 10,
            k: 11,
            l: 12,
            m: 13,
            n: 14,
            o: 15,
            p: 16,
            q: 17,
            r: 18,
            s: 19,
            t: 20,
            u: 21,
            v: 22,
            w: 23,
            x: 24,
            y: 25,
            z: 26
        };
        const nameArray = name.split("").map(n => ({ name: n, number: mapStr[n] }));
        let sum = nameArray.map(n => n.number).join("");
        sum = findSum(sum);
        setInfo({
            nameArray,
            sum
        })
    }

    const findSum = (num) => {
        if (num < 10) {
            return num;
        }
        const lastDigit = num % 10;
        const remainingNum = Math.floor(num / 10);
        return findSum(lastDigit + findSum(remainingNum));
    }

    const onTextChange = (value) => {
        setInfo({});
        setName(value);
    }

    return (
        <div className="mt-3">
            <Row>
                <Col className='col-md-6 offset-md-3'>
                    <div className="input-group mb-3">
                        <input type="text" onChange={(e) => onTextChange(e.target.value.toLowerCase())} onKeyPress={e => e.key === 'Enter' && calculate()} className="form-control" placeholder={intl.formatMessage({ id: 'enterName', defaultMessage: 'enterName' })} />
                        <button onClick={() => calculate()} className="btn btn-bni" type="button"><FormattedMessage id="get" defaultMessage="get" /></button>
                    </div>
                </Col>
            </Row>
            {Object.keys(info).length > 0 && name &&
                <Table striped bordered variant={`${userContext.userData.theme === 'dark' ? 'dark' : 'light'}`}>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="digit" defaultMessage="digit" /></th>
                            <th><FormattedMessage id="number" defaultMessage="number" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.nameArray && info.nameArray.map((n, i) => (
                            <tr key={i}>
                                <td>{n.name}</td>
                                <td>{n.number}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className='table-active border-top'>
                            <td><FormattedMessage id="singleDigitTotal" defaultMessage="singleDigitTotal" /></td>
                            <td><span className='btn btn-sm rounded-circle btn-bni'>{info.sum}</span></td>
                        </tr>
                    </tfoot>
                </Table>}
        </div>
    )
}

export default NameNumber;