import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

function OfflinePage() {
  return (
    <div className=''>
      <div className='p-2'>
        <div className='position-relative'>
          <div className='text-center mb-5'>
            <i className='fa fa-plug fa-5x text-danger' />
            <h2>You are Offline!</h2>
            <a className='btn btn-sm btn-primary rounded-pill px-3' href={`/${import.meta.env.VITE_SUBFOLDER}/`}>
              Retry
            </a>
          </div>
          <Row className='m-0'>
            <Col md={{ span: 6, offset: 3 }}>
              <ListGroup className='mb-2'>
                <ListGroup.Item variant='danger' active>
                  {import.meta.env.VITE_APP_NAME} is currently running without an internet connection.
                </ListGroup.Item>
                <ListGroup.Item variant='danger'>We could not connect to the internet!</ListGroup.Item>
                <ListGroup.Item variant='danger'>New data cannot be loaded until you are back online.</ListGroup.Item>
                <ListGroup.Item variant='danger'>
                  Your previously synchronized transactions remain available from offline storage, but live updates and new synchronization are
                  temporarily unavailable.
                </ListGroup.Item>
                <ListGroup.Item variant='danger'>
                  Once your connection is restored, the application will resume normal operation automatically.
                </ListGroup.Item>
                <ListGroup.Item variant='danger'>Please check your internet connection.</ListGroup.Item>
                <ListGroup.Item variant='danger'>
                  <a className='text-decoration-none' href={`/${import.meta.env.VITE_SUBFOLDER}/`}>
                    Try again.
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default OfflinePage;
