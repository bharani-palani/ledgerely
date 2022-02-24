import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContext";
import QRCode from "react-qr-code";

const Contribute = props => {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Contribute`;

  return (
    <section
      className="section lb contribute"
      style={{
        minHeight: window.screen.height
      }}
    >
      <div className="section-title">
        <div className="process-box">
          <div className="process-front text-center">
            <h2 className="grey-color">Contribute</h2>
            <hr className="hr" />
            <i className="fa fa-inr"></i>
            <p className="pl-5 pr-5">You like my work? Use <i className="fa fa-google google" />oogle Pay</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="text-center qrCode">
          <QRCode
            level="H"
            size={320}
            value={appData.upiKey}
          />
        </div>
      </div>
    </section>
  );
};

Contribute.propTypes = {
  property: PropTypes.string
};
Contribute.defaultProps = {
  property: "String name"
};

export default Contribute;
