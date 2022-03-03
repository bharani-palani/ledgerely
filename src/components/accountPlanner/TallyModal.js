import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";

const TallyModal = props => {
  const { totals, ...rest } = props;
  const [appplicationBalance, setApplicationBalance] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);
  const [unAccounted, setUnAccounted] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [appData] = useContext(AppContext);

  useEffect(() => {
    if (totals.length > 0) {
      let live =
        totals.length > 0 &&
        totals.filter(t => t.label === "Balance" && t.amount > 0);
      live = live.length > 0 ? live[0].amount : 0;
      live = live.toFixed(2);
      live = Number(live);
      setApplicationBalance(live);
    }
  }, [JSON.stringify(totals)]);

  useEffect(() => {
    let GrandTotal =
      Number(appplicationBalance).toFixed(2) -
      Number(bankBalance).toFixed(2) -
      Number(unAccounted).toFixed(2) -
      Number(walletBalance).toFixed(2);
    GrandTotal = Number(GrandTotal.toFixed(2));
    setGrandTotal(GrandTotal);

    const numerator = Number(appplicationBalance) - GrandTotal;
    let percent = numerator / appplicationBalance;
    percent = percent * 100;
    percent = percent > 100 ? 100 : percent;
    percent = isNaN(percent) ? 100 : percent;
    setProgressPercent(percent);
  }, [appplicationBalance, bankBalance, unAccounted, walletBalance]);

  const getStatus = netValue => {
    return {
      label: netValue === 0 ? "Settled" : netValue > 0 ? "Behind" : "Ahead",
      class:
        netValue === 0
          ? "text-success"
          : netValue > 0
          ? "text-danger"
          : "text-primary"
    };
  };

  return (
    <Modal {...rest} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title>Tally your incomes to expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tallyModal">
          <div className="py-2">
            <label htmlFor="appplicationBalance">Application balance</label>
            <input
              id="appplicationBalance"
              value={appplicationBalance}
              onChange={e => setApplicationBalance(e.target.value)}
              placeholder="Application balance"
              type="number"
              className="form-control"
            />
          </div>
          <div className="py-2">
            <label htmlFor="bankBalance">Bank balance</label>
            <input
              id="bankBalance"
              value={bankBalance}
              onChange={e => setBankBalance(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <div className="py-2">
            <label htmlFor="unAccounted">Un-Accounted</label>
            <input
              id="unAccounted"
              value={unAccounted}
              onChange={e => setUnAccounted(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <div className="py-2">
            <label htmlFor="walletBalance">Wallet balance</label>
            <input
              id="walletBalance"
              value={walletBalance}
              onChange={e => setWalletBalance(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <div className="py-2">
            <div className="text-center p-10">
              <h5 className={getStatus(grandTotal).class} >
                {getStatus(grandTotal).label}&nbsp;
                <i
                  className={`fa ${
                    progressPercent === 100 ? "fa-check" : "fa-times-circle"
                  }`}
                />
              </h5>
            </div>
            <div className={`text-center ${getStatus(grandTotal).class}`}>
              {helpers.countryCurrencyLacSeperator(
                appData.locale,
                appData.currency,
                grandTotal,
                Number(appData.maximumFractionDigits)
              )}
            </div>
          </div>
          <div
            className={`custom-progress-bar ${
              progressPercent < 100 ? "danger" : "success"
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

TallyModal.propTypes = {
  property: PropTypes.string
};
TallyModal.defaultProps = {
  property: "String name"
};

export default TallyModal;
