import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";

function Help(props) {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Help`;

  return (
    <section
      className=""
      style={{
        minHeight: window.screen.height
      }}
    >
      <>
        <div className="">
          <div className="process-box">
            <div className="process-front text-center">
              <h2 className="">Help</h2>
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
