import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import apiInstance from "../../services/apiServices";
import helpers from "../../helpers";
import CountDown from "./CountDown";
import Loader from "react-loader-spinner";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage } from 'react-intl'

const CheckCardCycleDate = props => {
  const userContext = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [childLoader, setChildLoader] = useState(false);
  const [selectedBank, setSelectedBank] = useState(false);
  const [ccDetails, setCcDetails] = useState({});
  const [cardList, setCardList] = useState([]);
  const now = new Date();
  useEffect(() => {
    setLoader(true);
    const a = getCcBankList();
    Promise.all([a]).then(r => {
      const data = r[0];
      setCardList(data);
      setLoader(false);
    });
  }, []);

  const loaderComp = () => {
    return (
      <div className="relativeSpinner">
        <Loader
          type={helpers.loadRandomSpinnerIcon()}
          color={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
          height={100}
          width={100}
        />
      </div>
    );
  };

  const getCreditCardDetails = bank => {
    const formdata = new FormData();
    formdata.append("bank", bank);
    setCcDetails({});
    setChildLoader(true);
    setSelectedBank(bank)
    return apiInstance
      .post("/account_planner/credit_card_details", formdata)
      .then(res => {
        const obj = res.data.response[0];

        let startDate = obj.credit_card_start_date;
        startDate = helpers.addMonths(
          new Date((`${now.getFullYear()}-${now.getMonth() + 1}-${startDate}`).replace(/-/g, "/")),
          -1
        );
        let [sYYYY, sMM, sDD] = [
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate()
        ];
        [sMM, sDD] = [sMM < 10 ? `0${sMM}` : sMM, sDD < 10 ? `0${sDD}` : sDD];
        startDate = `${sYYYY}-${sMM}-${sDD}`;

        let endDate = obj.credit_card_end_date;
        endDate = new Date(
          (`${now.getFullYear()}-${now.getMonth() + 1}-${endDate}`).replace(/-/g, "/")
        );
        let [eYYYY, eMM, eDD] = [
          endDate.getFullYear(),
          endDate.getMonth() + 1,
          endDate.getDate()
        ];
        [eMM, eDD] = [eMM < 10 ? `0${eMM}` : eMM, eDD < 10 ? `0${eDD}` : eDD];
        endDate = `${eYYYY}-${eMM}-${eDD}`;

        let payDate = obj.credit_card_payment_date;
        payDate = helpers.addMonths(
          new Date((`${now.getFullYear()}-${now.getMonth() + 1}-${payDate}`).replace(/-/g, "/")),
          1
        );
        let [pYYYY, pMM, pDD] = [
          payDate.getFullYear(),
          payDate.getMonth() + 1,
          payDate.getDate()
        ];
        [pMM, pDD] = [pMM < 10 ? `0${pMM}` : pMM, pDD < 10 ? `0${pDD}` : pDD];
        payDate = `${pYYYY}-${pMM}-${pDD}`;

        let remDays = new Date(payDate) - new Date();
        remDays = Math.abs(remDays);
        remDays = Math.ceil(remDays / (1000 * 60 * 60 * 24));
        const data = {
          cardNumber: obj.credit_card_number,
          cardName: obj.credit_card_name,
          startDate,
          endDate,
          payDate,
          remDays
        };
        setCcDetails(data);
        setChildLoader(false)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getCcBankList = () => {
    return apiInstance
      .get("/account_planner/credit_card_list")
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Modal {...props} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id="checkCreditCardCycleDate" /></Modal.Title>
      </Modal.Header>
      <Modal.Body className={`rounded-bottom ${userContext.userData.theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
        {loader ? loaderComp() : (<div className="row">
          {cardList &&
            cardList.length > 0 &&
            cardList.map((card, i) => (
              <div
                key={i}
                onClick={() => getCreditCardDetails(card.id)}
                className={`col-6 text-center cardWrapper ${selectedBank === card.id ? "active" : ""}`}
              >
                <i className="fa fa-credit-card-alt" />
                {card.value}
              </div>
            ))}
        </div>)}
        {childLoader ? (loaderComp()) : (
          Object.keys(ccDetails).length > 0 && <>
            <div className="py-3 text-center">{ccDetails.cardName}</div>
            <div className="container mt-10 text-center">
              <div className="contactLabel"><FormattedMessage id="cardNumber" /></div>
              <div>{ccDetails.cardNumber}</div>
              <div className="row pb-3 pt-3">
                <div className="col-6">
                  <label><FormattedMessage id="startDate" /></label>
                  <div>{ccDetails.startDate}</div>
                </div>
                <div className="col-6">
                  <label><FormattedMessage id="endDate" /></label>
                  <div>{ccDetails.endDate}</div>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <label><FormattedMessage id="payDate" /></label>
                  <div>{ccDetails.payDate}</div>
                </div>
                <div className="col-6">
                  <label><FormattedMessage id="remainingDays" /></label>
                  <div><CountDown ccDetails={ccDetails} /></div>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

CheckCardCycleDate.propTypes = {
  property: PropTypes.string
};
CheckCardCycleDate.defaultProps = {
  property: "String name"
};

export default CheckCardCycleDate;
