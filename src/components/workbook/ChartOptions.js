import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import NumberSlider from "./ReactiveElements/NumberSlider";

const ChartOptions = props => {
  return (
    <Container>
      <Row className='py-2'>
        <Col xs={12}>
          <NumberSlider title='Width' min={100} max={1000} init={350} />
        </Col>
        <Col xs={12}>
          <NumberSlider title='Height' min={100} max={1000} init={500} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChartOptions;
