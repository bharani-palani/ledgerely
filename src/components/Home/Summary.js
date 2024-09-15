import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import { SignupContext } from "./Signup";
import apiInstance from "../../services/apiServices";
import { MyAlertContext } from "../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const myAlertContext = useContext(MyAlertContext);
  const signupContext = useContext(SignupContext);
  const { formStructure, signUpStatus, setSignupStatus, userExistStatus } =
    signupContext;
  const checkFields = ["accountUserName", "accountEmail", "accountPassword"];
  const [openLoader, setOpenLoader] = useState(false);

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
          String(passwordMatchValidation[1]) &&
        !myAlertContext?.config?.show &&
        !userExistStatus
      ),
    );
  }, [JSON.stringify(formStructure)]);

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
    setOpenLoader(true);
    postSignUp()
      .then(res => {
        const bool = res.data.response;
        if (bool) {
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: intl.formatMessage({
              id: "error",
              defaultMessage: "error",
            }),
            content: intl.formatMessage({
              id: "appAccountCreatedPleaseLogin",
              defaultMessage: "appAccountCreatedPleaseLogin",
            }),
          });
          navigate("/");
        }
        if (!bool) {
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: intl.formatMessage({
              id: "error",
              defaultMessage: "error",
            }),
            content: intl.formatMessage({
              id: "unableToReachServer",
              defaultMessage: "unableToReachServer",
            }),
          });
        }
        if (typeof bool === "object") {
          const [status, message] = bool;
          console.log("bbb", status, message);
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: intl.formatMessage({
              id: "error",
              defaultMessage: "error",
            }),
            content: intl.formatMessage({
              id: "userAlreadyExist",
              defaultMessage: "userAlreadyExist",
            }),
          });
        }
      })
      .catch(e => {
        console.log("bbb", e);
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: intl.formatMessage({
            id: "error",
            defaultMessage: "error",
          }),
          content: intl.formatMessage({
            id: "oops",
            defaultMessage: "oops",
          }),
        });
      })
      .finally(() => setOpenLoader(false));
  };

  const Loader = props => (
    <Modal {...props} style={{ zIndex: 10000 }}>
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage id='pleaseWait' defaultMessage='pleaseWait' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-5 text-center bg-light rounded-bottom'>
        <i
          className='fa fa-5x fa-spin fa-circle-o-notch text-secondary'
          style={{ fontSize: "10rem" }}
        />
      </Modal.Body>
    </Modal>
  );

  return (
    <Container>
      {openLoader && (
        <Loader
          className='confirmQBModal'
          show={openLoader}
          size='sm'
          animation={true}
          keyboard={false}
          centered={true}
          backdrop='static'
        />
      )}
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

export default Summary;
