import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = props => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className=''>
          <div className='my-2'>
            <Link size='sm' className='btn btn-sm btn-primary' to={"/"}>
              <i className='fa fa-angle-double-left pe-2' /> <span>Back</span>
            </Link>
          </div>
          <div className='text-center fs-5 py-2'>Ledgerely Sign up</div>

          <ul className='list-group small'>
            <li className='list-group-item bni-bg d-flex align-items-center'>
              <i className='fa fa-check-circle pe-2' />
              <span>Credentials</span>
            </li>
            <li className='list-group-item d-flex align-items-center'>
              <i className='fa fa-check-circle pe-2' />
              <span> Demographics</span>
            </li>
          </ul>
        </Col>
        <Col
          md={10}
          className='border border-0 border-start position-relative vh-100'
        >
          <div className='py-2'>
            <div>Wrapper</div>
          </div>
          <Row className='w-100 position-fixed bottom-0'>
            <Col className='p-0'>
              <Button variant='dark' className='w-100 rounded-0'>
                Reset
              </Button>
            </Col>
            <Col className='p-0'>
              <Button className='w-100 rounded-0 btn-bni'>Submit</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
