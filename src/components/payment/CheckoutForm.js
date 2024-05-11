import React, { useCallback, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import apiInstance from "../../services/apiServices";
import { BillingContext } from "./Billing";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const billingContext = useContext(BillingContext);
  const userContext = useContext(UserContext);
  const { summary, showCheckout, setShowCheckout } = billingContext;

  const fetchClientSecret = useCallback(() => {
    const formdata = new FormData();
    formdata.append("summary", JSON.stringify(summary));
    return apiInstance
      .post("/payments/checkoutSubscription", formdata)
      .then(res => res.data.response);
  }, [summary]);

  const options = { fetchClientSecret };

  return (
    <Modal
      show={showCheckout}
      onHide={() => setShowCheckout(false)}
      style={{ zIndex: 9999 }}
      size='xl'
    >
      <Modal.Header closeButton>
        <Modal.Title className='d-flex align-items-center'>
          <i className='pe-2 fa fa-credit-card-alt' />
          <span>Checkout</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`p-0 ${
          userContext.userData.theme === "dark"
            ? "bg-dark text-white"
            : "bg-white text-dark"
        }`}
      >
        <div id='checkout'>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </Modal.Body>
      <Modal.Footer className='bg-white border-0' />
    </Modal>
  );
};
export default CheckoutForm;
