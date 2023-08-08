import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Row, Col, Button } from "react-bootstrap";
import Image from "../../images/banking.png";

const Home = props => {
  const userContext = useContext(UserContext);

  const FormInput = ({ id, type, placeholder, label }) => (
    <div className='form-floating mt-1'>
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
          <Row className={`justify-content-between`}>
            <Col sm={6} className={`p-0`}>
              <img src={Image} alt='brand' className='img-fluid helpImage' />
            </Col>
            <Col sm={6} className={`p-3 bni-bg position-relative formWrapper`}>
              <>
                <div className='text-dark'>Sign Up</div>
                <FormInput
                  id='email'
                  type='email'
                  placeholder='Email'
                  label='Email'
                />
                <FormInput
                  id='uname'
                  type='text'
                  placeholder='User name'
                  label='User name'
                />
                <FormInput
                  id='password'
                  type='password'
                  placeholder='Password'
                  label='Password'
                />
                <Row className='mt-2'>
                  <Col xs='10' className=''>
                    <Button
                      className='rounded-pill'
                      size='sm'
                      variant='primary'
                      onClick={() => {
                        userContext.setdropDown(true);
                        userContext.setOpenAppLoginModal(true);
                      }}
                    >
                      Sign in if you hold an account
                    </Button>
                  </Col>
                  <Col xs='2'>
                    <Button className='icon-bni pull-right' variant='dark'>
                      Create
                    </Button>
                  </Col>
                </Row>
                <div className='position-absolute bottom-0 text-dark small text-center w-100 p-1'>
                  Copy&copy; right reserved
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
