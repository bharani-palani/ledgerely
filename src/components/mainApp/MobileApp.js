import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage } from "react-intl";
import brandLogo from "../../images/logo/brandLogo.png";
import GlobalSearch from "../GlobalHeader/GlobalSearch";

const MobileApp = props => {
  const userContext = useContext(UserContext);
  const { onNavBarToggle, navBarExpanded } = props;
  const menu = userContext.userData.menu;

  return (
    <div className='mobile-menu'>
      <Navbar
        style={{ top: "45px" }}
        className={`py-0 ps-2 pe-2 justify-content-between ${
          userContext.userData.theme === "dark" ? "bg-dark" : "bg-white"
        }`}
        fixed={"top"}
        onToggle={onNavBarToggle}
        expanded={navBarExpanded}
        expand='lg'
      >
        <Navbar.Brand
          className='navbar-brand pt-2 me-0'
          style={{ flexBasis: "10%" }}
        >
          <Link to='/dashboard'>
            <img
              className='img-fluid'
              src={brandLogo}
              style={{ width: "40px", height: "40px" }}
            />
          </Link>
        </Navbar.Brand>
        <div style={{ flexBasis: "80%" }}>
          <GlobalSearch />
        </div>
        <Navbar.Toggle
          style={{ boxShadow: "none", flexBasis: "5%" }}
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
