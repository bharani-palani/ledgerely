import React, {useContext} from "react";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

function ErrorPage() {
    const [appData] = useContext(AppContext);
    document.title = `${appData.display_name} | Error Page`;
  return (
    <div className="video-section section">
      <div className="home-text-wrapper">
        <div className="home-message">
          <h1 className="">Oops!</h1>
          <h2 className="">404 Not Found</h2>
          <div className="error-details">
            Sorry, an error has occured, Requested page cannot be found!
          </div>
          <hr className="hr" />
          <div className="error-actions">
            <Link to="/about" className="btn btn-default-bordered btn-lg">
              <span className="glyphicon glyphicon-home" /> Home
            </Link>
            <a target="_blank" rel="noopener noreferrer" href="https://bharani.tech/contact" className="btn btn-lg">
              <span className="glyphicon glyphicon-phone" /> Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
