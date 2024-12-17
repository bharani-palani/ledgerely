import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { SignedUrl } from "../configuration/Gallery/SignedUrl";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage } from "react-intl";
import brandLogo from "../../images/logo/greenIconNoBackground.png";

const DesktopApp = () => {
  const userContext = useContext(UserContext);
  const menu = userContext.userData.menu;
  return (
    <header
      className={`vertical-header ${userContext?.userConfig?.webLayoutType}`}
    >
      <div
        className={`vertical-header-wrapper ${userContext?.userConfig?.webMenuType}`}
      >
        <nav
          className={`nav-menu ${userContext.userConfig?.webMenuType} ${
            userContext?.userConfig?.webLayoutType
          } ${userContext.userData.theme === "dark" ? "bg-dark" : "bg-white"}`}
        >
          <div className='nav-header'>
            <span className=''>
              <Link to={`/dev/dashboard`}>
                {/* <SignedUrl
                  mykey='logoImage'
                  type='image'
                  appData={globalContext}
                  unsignedUrl={globalContext.logoImg}
                  className='brand img-fluid'
                  optionalAttr={{ width: "40", height: "40" }}
                /> */}
                <img
                  className='brand img-fluid rounded-circle'
                  src={brandLogo}
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>
            </span>
          </div>
          <ul className={`header-menu ${userContext?.userConfig?.webMenuType}`}>
            {menu?.length > 0 &&
              menu.map((m, i) => (
                <li key={i}>
                  <Link
                    className={
                      userContext.userData.theme === "dark"
                        ? "text-white-50"
                        : "text-black"
                    }
                    to={m.href}
                  >
                    <FormattedMessage
                      id={m.page_id}
                      defaultMessage={m.page_id}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default DesktopApp;
