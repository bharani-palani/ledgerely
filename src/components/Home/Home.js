import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { Row, Col } from "react-bootstrap";
import Image from "../../images/concept/signIn.png";
import { useIntl } from "react-intl";
import LoginUser from "../../components/GlobalHeader/loginUser";
import { Link, useSearchParams } from "react-router-dom";
import banner from "../../images/banner/blackGreenBanner.svg";

const Home = () => {
  const myAlertContext = useContext(MyAlertContext);
  const globalContext = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get("signup");
  const intl = useIntl();
  const [, setLogger] = useState(
    JSON.parse(localStorage.getItem("userData")) || {},
  );

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
      className='loginScreen'
      style={{
        backgroundImage: `url(${Image})`,
      }}
    >
      <div className=''>
        <Row className={`vh-100 m-0 p-0 p-3 align-items-lg-center`}>
          <Col
            className={`offset-xl-10 offset-lg-9 offset-md-4 formArea border border-1 mb-3 p-0 bg-white rounded position-relative`}
          >
            <div className='p-2'>
              <img className='img-fluid rounded w-100 mb-2' src={banner} />
              <LoginUser onLogAction={d => onLogAction(d)} />
              <div
                className='p-absolute bottom-0 w-100 pb-2 row'
                style={{ left: "12px" }}
              >
                <div className='pb-1 col-sm-4 col-lg-12'>
                  <Link
                    to={"/signup"}
                    className='btn btn-sm btn-outline-primary w-100 rounded bg-gradient'
                  >
                    {intl.formatMessage({
                      id: "signUp",
                      defaultMessage: "signUp",
                    })}
                  </Link>
                </div>
                <div className='pb-1 col-sm-4 col-lg-12'>
                  <a
                    href={globalContext.privacyPolicyLink}
                    target='_blank'
                    className='btn btn-sm btn-sm btn-primary w-100'
                    rel='noreferrer'
                  >
                    {intl.formatMessage({
                      id: "privacyPolicy",
                      defaultMessage: "privacyPolicy",
                    })}
                  </a>
                </div>
                <div className='pb-1 col-sm-4 col-lg-12'>
                  <div>
                    <a
                      href={globalContext.termsOfServiceLink}
                      target='_blank'
                      className='btn btn-sm btn-primary w-100'
                      rel='noreferrer'
                    >
                      {intl.formatMessage({
                        id: "termsAndConditions",
                        defaultMessage: "termsAndConditions",
                      })}
                    </a>
                  </div>
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
