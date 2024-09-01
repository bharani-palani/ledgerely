import React, { useContext } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const Signup = () => {
  const globalContext = useContext(GlobalContext);
  const location = useLocation();

  const pages = [
    { id: "credentials", label: "Credentials", path: "/signup/credentials" },
    { id: "demographics", label: "Demographics", path: "/signup/demographics" },
  ];

  return (
    <Container fluid className='signUp'>
      <Row>
        <Col md={2} className='position-relative pb-5'>
          <div className='my-2 d-flex align-items-center justify-content-between'>
            <Link size='sm' className='btn btn-sm btn-primary' to={"/"}>
              <i className='fa fa-angle-double-left pe-2' /> <span>Back</span>
            </Link>
          </div>
          <div className='text-center fs-5 pb-2'>Sign up</div>
          <ul className='list-group small'>
            {pages.map(page => (
              <li
                key={page.id}
                className={`list-group-item d-flex align-items-center ${location.pathname === page.path ? "bni-bg" : ""}`}
              >
                <i className='fa fa-check-circle pe-2' />
                <Link to={page.path} className='text-dark d-block'>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className='position-absolute bottom-0'
            style={{ width: "-webkit-fill-available" }}
          >
            <div className='d-flex justify-content-center'>
              <div className='badge bni-bg text-dark'>
                {globalContext.appName}
              </div>
            </div>
          </div>
        </Col>
        <Col
          md={10}
          className='border border-0 border-start position-relative wrapper p-0'
        >
          <Outlet />
          <Row className='footerButton'>
            <Col className='pe-0'>
              <Button variant='dark' className='w-100 rounded-0'>
                Reset
              </Button>
            </Col>
            <Col className='px-0'>
              <Button className='w-100 rounded-0 btn-bni'>Submit</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
