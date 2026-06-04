import React from "react";
import { FormattedMessage } from "react-intl";

export const ExpiryHeading = () => (
  <div>
    <div className='d-flex align-items-center'>
      <i className='fa fa-exclamation-triangle fa-2x pt-2 text-danger' />
      <div className='ps-2'>
        <div className='fs-3'>
          <FormattedMessage
            id='paymentRequired'
            defaultMessage='paymentRequired'
          />
        </div>
        <div className='fs-6'>
          <FormattedMessage
            id='applicationExpired'
            defaultMessage='applicationExpired'
          />
        </div>
      </div>
    </div>
  </div>
);

export const ExpiryContent = () => {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div>
        <span className='fs-6'>
          <FormattedMessage
            id='pleaseChoosePlan'
            defaultMessage='pleaseChoosePlan'
          />
        </span>
      </div>
    </div>
  );
};
