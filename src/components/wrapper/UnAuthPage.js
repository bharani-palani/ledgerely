import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

function UnAuthPage() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Unauthorized Page`;
  return (
    <div className="video-section section">
      <div className="home-text-wrapper">
        <div className="home-message">
          <h1 className="grey-color">Hoi!</h1>
          <h2 className="grey-color">
            <i className="fa fa-lock" /> 401 Unauthorized
          </h2>
          <div className="error-details grey-color">
            Sorry, you do not have authorized credentials to access this module
          </div>
          <hr />
          <div className="error-actions">
            <Link to="/" className="btn btn-default-bordered btn-lg">
              <span className="glyphicon glyphicon-home" /> Home
            </Link>
            <a target="_blank" rel="noopener noreferrer" href="https://bharani.tech/contact" className="btn btn-bni btn-lg">
              <span className="glyphicon glyphicon-phone" /> support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnAuthPage;
