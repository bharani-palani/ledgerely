import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import { SignupContext } from "./Signup";

const Summary = props => {
  const intl = useIntl();
  const signupContext = useContext(SignupContext);
  const { formStructure } = signupContext;
  const checkFields = ["accountUserName", "accountEmail", "accountPassword"];
  const [signUpStatus, setSignupStatus] = useState(true);

  useEffect(() => {
    const allFieldsValidation = [...formStructure]
      .filter(f => f?.options?.required)
      .map(f => new RegExp(f?.options?.validation).test(f.value))
      .every(e => e);

    const passwordMatchValidation = [...formStructure]
      .filter(f => ["accountPassword", "accountConfirmPassword"].includes(f.id))
      .map(f => f.value);

    setSignupStatus(
      !(
        allFieldsValidation &&
        String(passwordMatchValidation[0]) ===
          String(passwordMatchValidation[1])
      ),
    );
  }, [formStructure]);

  const onSignUp = () => {
    alert("All good");
  };

  return (
    <Container>
      <h5 className='pb-0 mb-0'>
        <FormattedMessage id='summary' defaultMessage='summary' />
      </h5>
      <div className='small fst-italic pb-2'>
        <FormattedMessage
          id='pleaseCheckConnectionParameters'
          defaultMessage='pleaseCheckConnectionParameters'
        />
      </div>
      <Row>
        <Col xl={6} className='pb-2'>
          <Card>
            <Card.Header as='h6'>
              <FormattedMessage id='credentials' defaultMessage='credentials' />
            </Card.Header>
            <Card.Body>
              <Row>
                {formStructure
                  .filter(f => checkFields.includes(f.id))
                  .map((f, i) => (
                    <React.Fragment key={i}>
                      <Col xs={6} className='fst-italic fw-bold pb-1'>
                        {f.label}
                      </Col>
                      <Col xs={6}>
                        {f.id === "accountPassword"
                          ? new Array(f.value.length).fill("x")
                          : f.value}
                      </Col>
                    </React.Fragment>
                  ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className='pb-2'>
          <Card>
            <Card.Header as='h6'>
              <FormattedMessage
                id='demographics'
                defaultMessage='demographics'
              />
            </Card.Header>
            <Card.Body>
              <Row>
                {formStructure
                  .filter(
                    f =>
                      ![...checkFields, "accountConfirmPassword"].includes(
                        f.id,
                      ),
                  )
                  .map((f, i) => (
                    <React.Fragment key={i}>
                      <Col xs={6} className='fst-italic fw-bold pb-1'>
                        {f.label}
                      </Col>
                      <Col xs={6}>{f.value}</Col>
                    </React.Fragment>
                  ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className='d-flex justify-content-end'>
        <Button
          disabled={signUpStatus}
          variant='light'
          className='bni-bg text-dark'
          onClick={() => onSignUp()}
        >
          {intl.formatMessage({
            id: "signUp",
            defaultMessage: "signUp",
          })}
        </Button>
      </div>
    </Container>
  );
};

Summary.propTypes = {
  property: PropTypes.value,
};
Summary.defaultProps = {};

export default Summary;
