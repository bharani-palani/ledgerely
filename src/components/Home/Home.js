import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Row, Col, Button } from "react-bootstrap";
import Image from "../../images/banking.png";
import { FormattedMessage, useIntl } from "react-intl";
import apiInstance from "../../services/apiServices";
import ReactiveForm from "../configuration/ReactiveForm";
import Dashboard from "./Dashboard";
import { Alert } from "react-bootstrap";

const Home = props => {
  const userContext = useContext(UserContext);
  const intl = useIntl();
  const signUpCreateForm = [
    {
      id: "user_name",
      index: "user_name",
      label: intl.formatMessage({ id: "userName", defaultMessage: "userName" }),
      elementType: "text",
      value: "",
      placeHolder: intl.formatMessage({
        id: "userName",
        defaultMessage: "userName",
      }),
      className: "",
      options: {
        required: true,
        validation: /^[a-zA-Z0-9 ]{4,20}$/g,
        errorMsg: intl.formatMessage({
          id: "userNameRequired",
          defaultMessage: "userNameRequired",
        }),
        help: [
          intl.formatMessage({
            id: "setUniqueUserName",
            defaultMessage: "setUniqueUserName",
          }),
          intl.formatMessage({
            id: "thisShouldNotConflictOtherUserNames",
            defaultMessage: "thisShouldNotConflictOtherUserNames",
          }),
          intl.formatMessage(
            { id: "minimumLetters", defaultMessage: "minimumLetters" },
            { n: 4 },
          ),
          intl.formatMessage(
            { id: "maxLetters", defaultMessage: "maxLetters" },
            { n: 20 },
          ),
          intl.formatMessage({
            id: "noSpecialCharactersAllowed",
            defaultMessage: "noSpecialCharactersAllowed",
          }),
        ],
      },
    },
    {
      id: "user_email",
      index: "user_email",
      label: intl.formatMessage({ id: "email", defaultMessage: "email" }),
      elementType: "text",
      value: "",
      placeHolder: intl.formatMessage({ id: "email", defaultMessage: "email" }),
      className: "",
      options: {
        required: true,
        validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        errorMsg: intl.formatMessage({
          id: "enterValidEmail",
          defaultMessage: "enterValidEmail",
        }),
        help: [
          intl.formatMessage({
            id: "enterValidEmail",
            defaultMessage: "enterValidEmail",
          }),
        ],
      },
    },
    {
      id: "user_password",
      index: "user_password",
      label: intl.formatMessage({ id: "password", defaultMessage: "password" }),
      elementType: "password",
      value: "",
      placeHolder: intl.formatMessage({
        id: "password",
        defaultMessage: "password",
      }),
      className: "",
      options: {
        required: true,
        validation:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})/,
        errorMsg: `${intl.formatMessage({
          id: "password",
          defaultMessage: "password",
        })} ${intl.formatMessage({
          id: "inputDoesNotMatchCriteria",
          defaultMessage: "inputDoesNotMatchCriteria",
        })}`,
        help: [
          intl.formatMessage(
            { id: "minimumLetters", defaultMessage: "minimumLetters" },
            { n: 8 },
          ),
          intl.formatMessage(
            {
              id: "atleastNCapitalLetter",
              defaultMessage: "atleastNCapitalLetter",
            },
            { n: 1 },
          ),
          intl.formatMessage(
            {
              id: "atleastNSpecialCharacter",
              defaultMessage: "atleastNSpecialCharacter",
            },
            { n: 1 },
          ),
          intl.formatMessage(
            { id: "atleastNNumber", defaultMessage: "atleastNNumber" },
            { n: 1 },
          ),
          intl.formatMessage({
            id: "allTheAboveAreRequired",
            defaultMessage: "allTheAboveAreRequired",
          }),
        ],
      },
    },
  ];
  const [formStructure, setFormStructure] = useState(signUpCreateForm);
  const [signupStatus, setSignupStatus] = useState({ type: null, show: false });

  const signupInstance = () => {
    const formdata = new FormData();
    formdata.append(
      "user_name",
      formStructure.filter(f => f.id === "user_name")[0].value,
    );
    formdata.append(
      "user_email",
      formStructure.filter(f => f.id === "user_email")[0].value,
    );
    formdata.append(
      "user_password",
      formStructure.filter(f => f.id === "user_password")[0].value,
    );
    return apiInstance.post("/signup", formdata);
  };

  useEffect(() => {
    // setFormStructure([]);
    // setTimeout(() => {
    //   setFormStructure(signUpCreateForm);
    // }, 100);
  }, [intl]);

  const onMassagePayload = (index, value) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.value = value;
      }
      return backup;
    });
    setFormStructure(backupStructure);
  };

  const onReactiveFormSubmit = () => {
    signupInstance()
      .then(d =>
        setSignupStatus({ ...signupStatus, type: "success", show: true }),
      )
      .catch(e =>
        setSignupStatus({ ...signupStatus, type: "fail", show: true }),
      );
  };

  const SuccessAlert = () => (
    <Alert variant='success' className='bni-bg text-center'>
      <i className='fa fa-check-circle pe-1' />
      <span>
        An email has been sent to you containing an activation link. Please
        click on the link to activate your account.
      </span>
    </Alert>
  );

  const FailureAlert = () => (
    <Alert variant='warning' className='text-center'>
      <i className='fa fa-times-circle pe-1' />
      <span>
        An unknown error occured during account creation. Please try again!
      </span>
    </Alert>
  );

  return (
    <div className='container-fluid'>
      {userContext?.userData?.userId ? (
        <Dashboard />
      ) : (
        <>
          {signupStatus.show &&
            (signupStatus.type === "success" ? (
              <SuccessAlert />
            ) : (
              <FailureAlert />
            ))}
          <div className='d-flex align-items-center justify-content-center homeScreen m-3'>
            <Row className={`justify-content-between mainForm`}>
              <Col sm={6} className={`p-0`}>
                <img
                  src={Image}
                  alt='brand'
                  className='img-fluid helpImage w-100'
                />
              </Col>
              <Col
                sm={6}
                className={`p-3 bni-bg position-relative formWrapper`}
              >
                <>
                  <div className='text-dark'>
                    <FormattedMessage id='signUp' defaultMessage='signUp' />
                  </div>
                  {formStructure && formStructure.length > 0 && (
                    <ReactiveForm
                      parentClassName='reactive-form text-dark'
                      structure={signUpCreateForm}
                      onChange={(index, value) =>
                        onMassagePayload(index, value)
                      }
                      onSubmit={onReactiveFormSubmit}
                      submitBtnLabel={intl.formatMessage({
                        id: "create",
                        defaultMessage: "create",
                      })}
                      submitBtnClassName='btn btn-dark pull-right icon-bni'
                    />
                  )}
                  <Row className='position-absolute bottom-0 text-dark small text-center w-100 p-1 align-items-center'>
                    <Col sm={6}>
                      <div className='text-center'>
                        <Button
                          className='rounded-pill btn btn-dark rounded-pill icon-bni'
                          size='sm'
                          variant=''
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
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div>
                        <a href='#' target='_blank' className='btn-sm btn-link'>
                          {intl.formatMessage({
                            id: "termsAndConditions",
                            defaultMessage: "termsAndConditions",
                          })}
                        </a>
                      </div>
                    </Col>
                  </Row>
                </>
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
