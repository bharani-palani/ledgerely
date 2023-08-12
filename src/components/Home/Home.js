import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Row, Col, Button } from "react-bootstrap";
import Image from "../../images/banking.png";
import { FormattedMessage, useIntl } from "react-intl";

const Home = props => {
  const userContext = useContext(UserContext);
  const intl = useIntl();

  const FormInput = ({ id, type, placeholder, label }) => (
    <div className='form-floating mt-2'>
      <input
        onChange={e => false}
        type={type}
        id={id}
        className='form-control'
        onKeyDown={e => false}
        placeholder={placeholder}
      />
      <label className='icon-bni fw-light' htmlFor={id}>
        {label}
      </label>
    </div>
  );

  return (
    <div className='container-fluid'>
      {userContext?.userData?.userId ? (
        <div className='mx-2 alert alert-sm alert-primary text-center'>
          Dashboard
        </div>
      ) : (
        <div className='d-flex align-items-center justify-content-center homeScreen m-3'>
          <Row className={`justify-content-between mainForm`}>
            <Col sm={6} className={`p-0`}>
              <img src={Image} alt='brand' className='img-fluid helpImage' />
            </Col>
            <Col sm={6} className={`p-3 bni-bg position-relative formWrapper`}>
              <>
                <div className='text-dark'>
                  <FormattedMessage id='signUp' defaultMessage='signUp' />
                </div>
                <FormInput
                  id='email'
                  type='email'
                  placeholder={intl.formatMessage({
                    id: "email",
                    defaultMessage: "email",
                  })}
                  label={intl.formatMessage({
                    id: "email",
                    defaultMessage: "email",
                  })}
                />
                <FormInput
                  id='uname'
                  type='text'
                  placeholder={intl.formatMessage({
                    id: "userName",
                    defaultMessage: "userName",
                  })}
                  label={intl.formatMessage({
                    id: "userName",
                    defaultMessage: "userName",
                  })}
                />
                <FormInput
                  id='password'
                  type='password'
                  placeholder={intl.formatMessage({
                    id: "password",
                    defaultMessage: "password",
                  })}
                  label={intl.formatMessage({
                    id: "password",
                    defaultMessage: "password",
                  })}
                />
                <Row className='mt-2'>
                  <Col xs='9' className=''>
                    <Button
                      className='rounded-pill'
                      size='sm'
                      variant='primary'
                      onClick={() => {
                        userContext.setdropDown(true);
                        userContext.setOpenAppLoginModal(true);
                      }}
                    >
                      {intl.formatMessage({
                        id: "signInIfYouHoldAnAccount",
                        defaultMessage: "signInIfYouHoldAnAccount",
                      })}
                    </Button>
                  </Col>
                  <Col xs='3'>
                    <Button className='icon-bni pull-right' variant='dark'>
                      {intl.formatMessage({
                        id: "create",
                        defaultMessage: "create",
                      })}
                    </Button>
                  </Col>
                </Row>
                <div className='position-absolute bottom-0 text-dark small text-center w-100 p-1'>
                  <a href='#' target='_blank' className='btn-link'>
                    {intl.formatMessage({
                      id: "termsAndConditions",
                      defaultMessage: "termsAndConditions",
                    })}
                  </a>
                </div>
              </>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Home;
