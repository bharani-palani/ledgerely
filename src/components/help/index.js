import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";

function Help(props) {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Help`;

  return (
    <section
      className="section lb"
      style={{
        minHeight: window.screen.height
      }}
    >
      <>
        <div className="section-title">
          <div className="process-box">
            <div className="process-front text-center">
              <h2 className="grey-color">Help</h2>
              <hr className="hr" />
              <i className="fa fa-question"></i>
              <p className="pl-5 pr-5">Happy to assist on any..</p>
            </div>
          </div>
        </div>
        <div className="container-fluid">Help Content</div>
      </>
    </section>
  );
}

export default Help;
