import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import { SignupContext } from "./Signup";
import apiInstance from "../../services/apiServices";

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

  const postSignUp = async () => {
    const formdata = new FormData();
    const accountUserName = formStructure.filter(
      f => f.id === "accountUserName",
    )[0].value;
    const accountName = formStructure.filter(f => f.id === "accountName")[0]
      .value;
    const accountEmail = formStructure.filter(f => f.id === "accountEmail")[0]
      .value;
    const accountPassword = formStructure.filter(
      f => f.id === "accountPassword",
    )[0].value;
    const accountConfirmPassword = formStructure.filter(
      f => f.id === "accountConfirmPassword",
    )[0].value;
    const accountAddress1 = formStructure.filter(
      f => f.id === "accountAddress1",
    )[0].value;
    const accountAddress2 = formStructure.filter(
      f => f.id === "accountAddress2",
    )[0].value;
    const accountCity = formStructure.filter(f => f.id === "accountCity")[0]
      .value;
    const accountState = formStructure.filter(f => f.id === "accountState")[0]
      .value;
    const accountPostalCode = formStructure.filter(
      f => f.id === "accountPostalCode",
    )[0].value;
    const accountCountry = formStructure.filter(
      f => f.id === "accountCountry",
    )[0].value;
    formdata.append("accountUserName", accountUserName);
    formdata.append("accountName", accountName);
    formdata.append("accountEmail", accountEmail);
    formdata.append("accountPassword", accountPassword);
    formdata.append("accountConfirmPassword", accountConfirmPassword);
    formdata.append("accountAddress1", accountAddress1);
    formdata.append("accountAddress2", accountAddress2);
    formdata.append("accountCity", accountCity);
    formdata.append("accountState", accountState);
    formdata.append("accountPostalCode", accountPostalCode);
    formdata.append("accountCountry", accountCountry);
    return await apiInstance.post("/signUp", formdata);
  };

  const onSignUp = () => {
    postSignUp()
      .then(res => {
        const bool = res.data.response;
        if (bool) {
          alert("Signup success");
        } else {
          alert("Signup failed");
        }
      })
      .catch(() => {
        alert("Oops.. some thing went wrong");
      });
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
