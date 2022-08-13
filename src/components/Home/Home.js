import React, { useState } from 'react';
import AmortizationCalculator from './AmortizationCalculator'

function Home(props) {
  const menuList = [{
    page_id: '1',
    constant: 'AMORT',
    label: 'Amortization Calculator',
    description: 'Calculate EMI on your loan amount, ROI and tenure input',
    icon: 'fa fa-line-chart',
  }];
  const mapComponent = {
    AMORT: AmortizationCalculator
  }
  const [menu, setMenu] = useState("");

  return (
    <div className="mt-3 container-fluid">
      <div className="p-3 mb-2 rounded bni-bg bni-text">
        <h4>Hello, Welcome to Bharani&lsquo;s apps</h4>
        Please opt one from the choices below,
      </div>
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
                    Click here
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {(typeof mapComponent[menu] !== "undefined" && menu !== "") && React.createElement(mapComponent[menu], {}, "")}
      </div>
    </div>
  );
}

export default Home;
