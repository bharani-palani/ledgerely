import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";

const PageHeader = ({ icon, intlId, children, ...rest }) => {
  const userContext = useContext(UserContext);
  return (
    <div
      {...rest}
      className={`bg-gradient ${
        userContext.userData.theme === "dark"
          ? "bg-dark darkBoxShadow"
          : "bg-white lightBoxShadow"
      } mt-2 ps-3 py-2 rounded-pill`}
    >
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <i className={`${icon} fa-1x`} />
          <div className='ps-2 mb-0'>
            <FormattedMessage id={intlId} defaultMessage={intlId} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
