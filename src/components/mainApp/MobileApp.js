import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SignedUrl } from "../configuration/Gallery/SignedUrl";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage } from "react-intl";
import { GlobalContext } from "../../contexts/GlobalContext";

const MobileApp = props => {
  const userContext = useContext(UserContext);
  const globalContext = useContext(GlobalContext);
  const { onNavBarToggle, navBarExpanded } = props;
  const menu = userContext.userData.menu;

  return (
    <div className='mobile-menu'>
      <Navbar
        style={{ top: "45px" }}
        className={`py-0 ps-2 pe-3 ${
          userContext.userData.theme === "dark" ? "bg-dark" : "bg-white"
        }`}
        fixed={"top"}
        onToggle={onNavBarToggle}
        expanded={navBarExpanded}
        expand='lg'
      >
        <Navbar.Brand className='navbar-brand pt-2'>
          <Link to='/'>
            <SignedUrl
              type='image'
              appData={globalContext}
              unsignedUrl={globalContext.logoImg}
              className='img-fluid'
              optionalAttr={{ width: "40", height: "40" }}
              mykey='logoImage'
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ boxShadow: "none" }}
          className='p-0 pe-1 fs-2 btn text-secondary border-1'
          aria-controls='basic-navbar-nav'
          bsPrefix='navbar-toggle'
        >
          <i className={`fa fa-bars icon-bni`} />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <ul className='header-menu'>
            {menu.map((m, i) => (
              <li key={i}>
                <Link
                  className={
                    userContext.userData.theme === "dark"
                      ? "link-light"
                      : "link-dark"
                  }
                  onClick={onNavBarToggle}
                  to={m.href}
                >
                  <FormattedMessage id={m.page_id} defaultMessage={m.page_id} />
                </Link>
              </li>
            ))}
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MobileApp;
