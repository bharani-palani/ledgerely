import React from "react";

function ErrorService() {
  document.title = `Service Error`;
  return (
    <div className="video-section">
      <div className="overlay"></div>
      <div className="home-text-wrapper">
        <div className="home-message">
          <div className="no-internet">
            <i className="fi-tech-internet-1"></i>
            <h1>Sorry!</h1>
            <h2>
              Unable to download application data.
            </h2>
            <div className="error-details">
              Please check your internet connection
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ErrorService;
