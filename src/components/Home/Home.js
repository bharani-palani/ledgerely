import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { Row, Col } from "react-bootstrap";
import Image from "../../images/banking.png";
import { useIntl } from "react-intl";
import LoginUser from "../../components/GlobalHeader/loginUser";
import { Link, useSearchParams } from "react-router-dom";
import banner from "../../images/logo/banner.png";

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
    <div className='loginScreen'>
      <div className='bni-bg'>
        <Row className={`vh-100 m-0 p-0 p-3`}>
          <Col
            xxl={10}
            xl={9}
            lg={9}
            sm={6}
            className='text-center py-2 p-0 d-none d-lg-block'
          >
            <img src={Image} alt='brand' className='img-fluid rounded' />
          </Col>
          <Col
            xxl={2}
            xl={3}
            lg={3}
            sm={12}
            className={`formArea mb-3 p-0 bg-white rounded position-relative`}
          >
            <div className='p-2'>
              <img
                style={{ height: "75px" }}
                className='img-fluid rounded w-100 d-lg-none'
                src={banner}
              />
              <LoginUser onLogAction={d => onLogAction(d)} />
              <div className='p-absolute bottom-0 w-100 pb-2 row'>
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
