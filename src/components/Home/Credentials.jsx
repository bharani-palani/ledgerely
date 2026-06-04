import React, { useContext } from "react";
import ReactiveForm from "../configuration/ReactiveForm";
import { useIntl, FormattedMessage } from "react-intl";
import { SignupContext } from "./Signup";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyAlertContext } from "../../contexts/AlertContext";

const Credentials = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const myAlertContext = useContext(MyAlertContext);
  const signupContext = useContext(SignupContext);
  const { formStructure, onMassagePayload } = signupContext;
  const checkFields = [
    "accountUserName",
    "accountEmail",
    "accountPassword",
    "accountConfirmPassword",
  ];

  const onReactiveFormSubmit = () => {
    const backup = [...formStructure].filter(f => checkFields.includes(f.id));
    if (
      backup[0].value &&
      backup[1].value &&
      String(backup[2].value) === String(backup[3].value)
    ) {
      navigate("/signup/demographics");
      myAlertContext.setConfig({
        show: false,
      });
    }
    if (String(backup[2].value) !== String(backup[3].value)) {
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
          id: "passwordNoMatch",
          defaultMessage: "passwordNoMatch",
        }),
      });
    }
  };

  return (
    <Container>
      <h5 className='pb-0 mb-0'>
        <FormattedMessage id='credentials' defaultMessage='credentials' />
      </h5>
      <div className='small fst-italic pb-2'>
        <FormattedMessage
          id='yourSignInParameters'
          defaultMessage='yourSignInParameters'
        />
      </div>
      {formStructure && formStructure.length > 0 && (
        <ReactiveForm
          parentClassName='reactive-form text-dark'
          structure={formStructure.filter(f => checkFields.includes(f.id))}
          onChange={(index, value) => onMassagePayload(index, value)}
          onSubmit={() => onReactiveFormSubmit()}
          submitBtnClassName='btn btn-bni pull-right'
          submitBtnLabel={intl.formatMessage({
            id: "next",
            defaultMessage: "next",
          })}
        />
      )}
    </Container>
  );
};

export default Credentials;
