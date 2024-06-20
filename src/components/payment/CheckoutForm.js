import React, { useCallback, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import apiInstance from "../../services/apiServices";
import { BillingContext } from "./Billing";
import { Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const billingContext = useContext(BillingContext);
  const { summary, showCheckout, setShowCheckout } = billingContext;

  const fetchClientSecret = useCallback(() => {
    const formdata = new FormData();
    formdata.append("summary", JSON.stringify(summary));
    return apiInstance
      .post("/payments/checkoutSubscription", formdata)
      .then(res => res.data.response.client_secret);
  }, [summary]);

  const options = { fetchClientSecret };

  return (
    <Modal
      show={showCheckout}
      onHide={() => setShowCheckout(false)}
      style={{ zIndex: 10000 }}
      size='xl'
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className='d-flex align-items-center'>
          <i className='pe-2 fa fa-credit-card-alt' />
          <span className='small'>
            <FormattedMessage id='checkout' defaultMessage='checkout' />
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`p-0 bg-white text-dark`}>
        <div id='checkout'>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 bg-white justify-content-center px-2 py-1'>
        <small className='text-danger' style={{ fontSize: "0.75rem" }}>
          <FormattedMessage id='checkoutNote' defaultMessage='checkoutNote' />
        </small>
      </Modal.Footer>
    </Modal>
  );
};
export default CheckoutForm;
