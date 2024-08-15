import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { BillingContext } from "./Billing";
import apiInstance from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { PaymentSuccessHeading, PaymentSuccessContent } from "./PaymentAlert";
import { FormattedMessage } from "react-intl";

const SessionPopup = props => {
  const userContext = useContext(UserContext);
  const billingContext = useContext(BillingContext);
  const myAlertContext = useContext(MyAlertContext);
  const { showSessionPopup, setShowSessionPopup, summary } = billingContext;
  const timerArray = [
    "hourglass-o",
    "hourglass-start",
    "hourglass-half",
    "hourglass-end",
    "hourglass",
  ];
  const [timerIndex, setTimerIndex] = useState(0);

  const getUserConfig = async appId => {
    const formdata = new FormData();
    formdata.append("appId", appId);
    return await apiInstance.post("/getUserConfig", formdata);
  };

  const isOrderPaid = async () => {
    const formdata = new FormData();
    formdata.append("customerId", summary.razorPayCustomerId);
    formdata.append("expiryDate", userContext.userConfig.expiryDateTime);
    return await apiInstance.post("/payments/razorpay/isOrderPaid", formdata);
  };

  useEffect(() => {
    let start = 0;
    const id = setInterval(() => {
      start = start + 1;
      start = start > timerArray.length - 1 ? 0 : start;
      setTimerIndex(start);
      isOrderPaid()
        .then(r => {
          const status = r?.data?.response;
          if (status) {
            // update your new plan details if order received as paid
            getUserConfig(userContext.userConfig.appId)
              .then(res => {
                const {
                  data: { response },
                } = res;
                console.log("bbb", response[0]);
                userContext.setUserConfig(prev => ({
                  ...prev,
                  ...response[0],
                }));
                myAlertContext.setConfig({
                  show: true,
                  className: "alert-success border-0 text-dark",
                  type: "success",
                  dismissible: true,
                  heading: <PaymentSuccessHeading />,
                  content: <PaymentSuccessContent />,
                });
              })
              .catch(err =>
                console.error("Unable to fetch user config and order", err),
              )
              .finally(() => setShowSessionPopup(false));
          }
        })
        .catch(err => console.error("fetch order error:", err));
    }, 1000 * 3);
    return () => clearInterval(id);
  }, []);

  return (
    <Modal
      show={showSessionPopup}
      onHide={() => setShowSessionPopup(false)}
      style={{ zIndex: 10000 }}
      keyboard={false}
      backdrop='static'
    >
      <Modal.Header>
        <Modal.Title className='d-flex align-items-center'>
          <i className='px-2 fa-1x fa fa-hand-paper-o' />
          <span>
            <FormattedMessage id='pleaseWait' defaultMessage='pleaseWait' />
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`rounded-bottom ${
          userContext.userData.theme === "dark"
            ? "bg-dark text-white"
            : "bg-white text-dark"
        }`}
      >
        <div className='text-center'>
          <div>
            <FormattedMessage id='doNotRefresh' defaultMessage='doNotRefresh' />
          </div>
          <div className='p-5'>
            <i
              className={`animate__animated animate__pulse animate__infinite fa fa-${timerArray[timerIndex]} fa-5x fa-fw`}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SessionPopup;
