import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { Row, Col } from "react-bootstrap";
import Image from "../../images/banking.png";
import { useIntl } from "react-intl";
import LoginUser from "../../components/GlobalHeader/loginUser";
import { Link, useSearchParams } from "react-router-dom";

const Home = props => {
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
    <div className='container'>
      <>
        <div className='homeScreen'>
          <Row className={`justify-content-md-center mainForm`}>
            <Col lg={6} className={``}>
              <img
                src={Image}
                alt='brand'
                className='img-fluid helpImage w-100'
              />
            </Col>
            <Col lg={6} className={`p-3 position-relative formWrapper`}>
              <>
                <LoginUser onLogAction={d => onLogAction(d)} />
                <Row className='position-absolute bottom-0 text-dark small text-center w-100 align-items-center'>
                  <Col sm={12} className=''>
                    <Link
                      to={"/signup"}
                      className='btn btn-md btn-bni w-100 rounded-pill bg-gradient'
                    >
                      {intl.formatMessage({
                        id: "signUp",
                        defaultMessage: "signUp",
                      })}
                    </Link>
                  </Col>
                  <Col sm={6} className='p-2'>
                    <div>
                      <a
                        href={globalContext.privacyPolicyLink}
                        target='_blank'
                        className='btn btn-sm btn-link'
                        rel='noreferrer'
                      >
                        {intl.formatMessage({
                          id: "privacyPolicy",
                          defaultMessage: "privacyPolicy",
                        })}
                      </a>
                    </div>
                  </Col>
                  <Col sm={6} className='p-2'>
                    <div>
                      <a
                        href={globalContext.termsOfServiceLink}
                        target='_blank'
                        className='btn btn-sm btn-link'
                        rel='noreferrer'
                      >
                        {intl.formatMessage({
                          id: "termsAndConditions",
                          defaultMessage: "termsAndConditions",
                        })}
                      </a>
                    </div>
                  </Col>
                </Row>
              </>
            </Col>
          </Row>
        </div>
      </>
    </div>
  );
};

export default Home;
