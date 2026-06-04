import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const UpgradeHeading = () => (
  <div>
    <div className='d-flex align-items-center'>
      <i className='fa fa-exclamation-triangle fa-2x pt-2 text-danger' />
      <div className='ps-2'>
        <div className='fs-3'>
          <FormattedMessage id='alert' defaultMessage='alert' />
        </div>
        <div className='fs-6'>
          <FormattedMessage
            id='maximumQuotaExceeded'
            defaultMessage='maximumQuotaExceeded'
          />
        </div>
      </div>
    </div>
  </div>
);

const UpgradeContent = () => {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div>
        <Link
          className='btn btn-sm btn-primary me-1 rounded-pill'
          to='/billing'
        >
          <i className='fa fa-credit-card-alt pe-1' />
          <FormattedMessage id='upgradeNow' defaultMessage='upgradeNow' />
        </Link>
        <span className='fs-6'>
          <FormattedMessage
            id='accessUnlimitedStorage'
            defaultMessage='accessUnlimitedStorage'
          />
        </span>
      </div>
    </div>
  );
};

export { UpgradeHeading, UpgradeContent };
