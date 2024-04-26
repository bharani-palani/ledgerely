import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import Encryption from "../../helpers/clientServerEncrypt";

const UpgradeHeading = () => (
  <div>
    <div className='d-flex align-items-center'>
      <i className='fa fa-exclamation-triangle fa-2x pt-2' />
      <div className='ps-2'>
        <div className='fs-3'>Alert</div>
        <div className='fs-6'>Maximum quota limit exceeded</div>
      </div>
    </div>
  </div>
);

const UpgradeContent = () => {
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const encryption = new Encryption();

  const generateUpgradeLink = () => {
    let link = globalContext.appPaymentLink;
    link = link.replace(
      "{appId}",
      encryption.encrypt(userContext.userConfig.appId, "123"),
    );
    return link;
  };

  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div>
        <a
          className='btn btn-sm btn-primary me-1 rounded-pill'
          href={generateUpgradeLink()}
          target='_blank'
          rel='noreferrer'
        >
          <i className='fa fa-credit-card pe-1' />
          Upgrade now
        </a>
        <span className='fs-6'>
          to access unlimited storage to users, categories, banks, credit cards,
          transactions, datasource and workbooks
        </span>
      </div>
    </div>
  );
};

export { UpgradeHeading, UpgradeContent };
