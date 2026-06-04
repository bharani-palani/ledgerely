import React from "react";
import { FormattedMessage } from "react-intl";

export const CouponHeading = () => (
  <div>
    <div className='d-flex align-items-center'>
      <i className='fa fa-smile-o fa-2x pt-2 text-success' />
      <div className='ps-2'>
        <div className='fs-3'>
          <FormattedMessage id='bliss' defaultMessage='bliss' />
        </div>
        <div className='fs-6'>
          <FormattedMessage
            id='discountAvailable'
            defaultMessage='discountAvailable'
          />
        </div>
      </div>
    </div>
  </div>
);

export const CouponContent = ({ values }) => {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div>
        <span className='fs-6'>
          <FormattedMessage
            id='couponAvailableNow'
            defaultMessage='couponAvailableNow'
            values={{
              n: values.n,
              y: `"${values.y}"`,
            }}
          />
        </span>
      </div>
    </div>
  );
};
