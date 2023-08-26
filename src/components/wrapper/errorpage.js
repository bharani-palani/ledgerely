import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";

function ErrorPage() {
  const userContext = useContext(UserContext);
  return (
    <div className='pt-5'>
      <div className='pt-5'>
        <div className='pt-5 text-center'>
          <h1 className=''>
            <FormattedMessage id='oops' defaultMessage='oops' />!
          </h1>
          <h1 className='text-danger'>404</h1>
          <div className=''>
            <FormattedMessage
              id='sorryYourRequestedPageCannotBeFound'
              defaultMessage='sorryYourRequestedPageCannotBeFound'
            />
            !
          </div>
          <hr className='hr' />
          <div className='py-2'>
            <Link
              to='/'
              className={`me-2 btn ${
                userContext.userData.theme === "dark"
                  ? "btn-outline-light"
                  : "btn-outline-dark"
              }`}
            >
              <i className='fa fa-home' />{" "}
              <FormattedMessage id='home' defaultMessage='home' />
            </Link>
            <a
              rel='noopener noreferrer'
              href={`mailto:${userContext.userConfig.email}`}
              className={`btn ${
                userContext.userData.theme === "dark"
                  ? "btn-outline-light"
                  : "btn-outline-dark"
              }`}
            >
              <i className='fa fa-envelope' />{" "}
              <FormattedMessage id='support' defaultMessage='support' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
