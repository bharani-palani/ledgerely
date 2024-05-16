import React from "react";
import { FormattedMessage } from "react-intl";

const PaymentSuccessHeading = () => (
  <div>
    <div className='d-flex align-items-center'>
      <i className='fa fa-check fa-2x pt-2 text-success' />
      <div className='ps-2'>
        <div className='fs-3'>
          <FormattedMessage id='success' defaultMessage='success' />
        </div>
        <div className='fs-6'>
          <FormattedMessage
            id='paymentReceived'
            defaultMessage='paymentReceived'
          />
        </div>
      </div>
    </div>
  </div>
);

const PaymentSuccessContent = () => {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div>
        <span className='fs-6'>
          <FormattedMessage
            id='paymentSuccessMessage'
            defaultMessage='paymentSuccessMessage'
          />
        </span>
      </div>
    </div>
  );
};

const PaymentFailedHeading = () => (
  <div>
    <div className='d-flex align-items-center'>
      <i className='fa fa-times-circle fa-2x pt-2 text-danger' />
      <div className='ps-2'>
        <div className='fs-3'>
          <FormattedMessage id='failed' defaultMessage='failed' />
        </div>
        <div className='fs-6'>
          <FormattedMessage
            id='paymentNotReceived'
            defaultMessage='paymentNotReceived'
          />
        </div>
      </div>
    </div>
  </div>
);

const PaymentFailedContent = ({ sessionId }) => {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div>
        <span className='fs-6'>
          <FormattedMessage
            id='paymentFailMessage'
            defaultMessage='paymentFailMessage'
          />
        </span>
      </div>
      <a
        href={`?session_id=${sessionId}`}
        className='btn btn-sm btn-primary rounded-pill'
      >
        <FormattedMessage id='retry' defaultMessage='retry' />
      </a>
    </div>
  );
};

export {
  PaymentSuccessHeading,
  PaymentSuccessContent,
  PaymentFailedHeading,
  PaymentFailedContent,
};
