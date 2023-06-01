import React, { useEffect, useState } from 'react';
import AmortizationCalculator from './AmortizationCalculator';
import NameNumber from './NameNumber';
import { FormattedMessage, useIntl } from 'react-intl'

const Apps = () => {
    const [menu, setMenu] = useState("");
    const intl = useIntl()

    const menuList = [{
        page_id: '1',
        constant: 'AMORT',
        label: intl.formatMessage({ id: 'amortizationCalculator', defaultMessage: 'amortizationCalculator' }),
        description: intl.formatMessage({ id: 'amortizationCalculatorSubTitle', defaultMessage: 'amortizationCalculatorSubTitle' }),
        icon: 'fa fa-line-chart',
    }, {
        page_id: '2',
        constant: 'NAMENUMBER',
        label: intl.formatMessage({ id: 'nameNumber', defaultMessage: 'nameNumber' }),
        description: intl.formatMessage({ id: 'nameNumberSubTitle', defaultMessage: 'nameNumberSubTitle' }),
        icon: 'fa fa-sort-numeric-asc',
    }];

    const MapComponent = () => {
        const abc = {
            AMORT: AmortizationCalculator,
            NAMENUMBER: NameNumber
        };
        const Comp = abc[menu];
        return <Comp />
    }

    useEffect(() => {
        if (menu) {
            setMenu("")
            setMenu(menu)
        }
    }, [menu])

    return (<div className="mt-3 container-fluid">
        <div className="row">
            {menuList.map(m => (
                <div key={m.page_id} className={`col-md-3 text-black mb-1`}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">{m.label}</h5>
                            <div className="text-center"><i className={`fa-5x p-2 ${m.icon}`} /></div>
                            <p className="card-text">{m.description}</p>
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-bni"
                                    onClick={() => setMenu(m.constant)}
                                >
                                    <FormattedMessage id="clickHere" defaultMessage="clickHere" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div>
            {menu && <MapComponent />}
        </div>
    </div>
    )
}


export default Apps;