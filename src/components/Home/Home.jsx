import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { Row, Col } from "react-bootstrap";
import Image from "../../images/concept/signIn.png";
import { useIntl } from "react-intl";
import LoginUser from "../../components/GlobalHeader/loginUser";
import { Link, useSearchParams } from "react-router-dom";
import banner from "../../images/banner/greenBanner.png";
import brandIcon from "../../images/logo/greenIconNoBackground.png";

const Home = () => {
  const myAlertContext = useContext(MyAlertContext);
  const globalContext = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get("signup");
  const intl = useIntl();
  const [, setLogger] = useState(JSON.parse(localStorage.getItem("userData")) || {});
  const capacitor = import.meta.env.MODE === "capacitor";

  const onLogAction = b => {
    setLogger(b);
  };

  useEffect(() => {
    if (queryParamValue) {
      myAlertContext.setConfig({
        show: true,
        className: "alert-success border-0 text-dark",
        type: "success",
        dismissible: true,
        heading: intl.formatMessage({
          id: "success",
          defaultMessage: "success",
        }),
        content: intl.formatMessage({
          id: "appAccountCreatedPleaseLogin",
          defaultMessage: "appAccountCreatedPleaseLogin",
        }),
      });
    }
    return () => {
      myAlertContext.setConfig({
        show: false,
      });
    };
  }, [queryParamValue]);

  return (
    <div
      className={`loginScreen position-relative`}
      style={{
        backgroundImage: `url(${Image})`,
      }}
    >
      <div className='overflow-hidden vh-100'>
        <Row className={`vh-100 align-items-lg-center ${capacitor ? "mt-2 px-4 py-5" : "m-0 p-0 p-3"}`}>
          <Col className={`offset-xl-9 offset-lg-8 offset-md-6 formArea glassCard text-dark p-0 position-relative`}>
            <div className='p-3 p-md-4'>
              <a href={globalContext.appDocLink} target='_blank' rel='noreferrer' className='text-center d-block mb-3'>
                <div className='d-flex align-items-center justify-content-center gap-3 mb-3 py-3 px-4 px-md-5 rounded-4 glassLogo'>
                  <img src={brandIcon} alt='Ledgerely icon' className='img-fluid' width='60' height='60' />
                  <img src={banner} alt={globalContext.appName || "Ledgerely"} className='img-fluid' width='250' />
                </div>
              </a>
              <LoginUser onLogAction={d => onLogAction(d)} />
              <div className='p-absolute bottom-0 w-100 pb-2 row' style={{ left: "12px" }}>
                <div className='pb-1 col-sm-12 col-lg-12'>
                  <Link to={"/signup"}
                    className='btn btn-light py-2 text-dark rounded-3 border-0 w-100 d-flex align-items-center justify-content-center gap-2 glassBtn glassBtnLight'
                  >
                    <img src={brandIcon} alt='Ledgerely icon' className='img-fluid' width='25' height='25' />
                    <span>
                      {intl.formatMessage({
                        id: "signUp",
                        defaultMessage: "signUp",
                      })}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
