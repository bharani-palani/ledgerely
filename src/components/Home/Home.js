import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { Row, Col } from "react-bootstrap";
import Image from "../../images/banking.png";
import { useIntl } from "react-intl";
import LoginUser from "../../components/GlobalHeader/loginUser";
import { Link, useSearchParams } from "react-router-dom";

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
    <div className=''>
      <div className='bni-bg'>
        <Row className={`vh-100 m-0 p-0 p-3`}>
          <Col xxl={9} xl={9} lg={9} className='text-center py-2 p-0'>
            <img src={Image} alt='brand' className='img-fluid rounded' />
          </Col>
          <Col
            xxl={3}
            xl={3}
            lg={3}
            className={`formArea p-0 bg-white rounded position-relative`}
          >
            <div className='p-2'>
              <LoginUser onLogAction={d => onLogAction(d)} />
              <div className='position-absolute bottom-0 w-100 pe-3 pb-2'>
                <div className='pb-1'>
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
                <div className='pb-1'>
                  <a
                    href={globalContext.privacyPolicyLink}
                    target='_blank'
                    className='btn btn-sm btn-primary w-100'
                    rel='noreferrer'
                  >
                    {intl.formatMessage({
                      id: "privacyPolicy",
                      defaultMessage: "privacyPolicy",
                    })}
                  </a>
                </div>
                <div className='pb-1'>
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
