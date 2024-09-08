import React, { useContext } from "react";
import ReactiveForm from "../configuration/ReactiveForm";
import { useIntl, FormattedMessage } from "react-intl";
import { SignupContext } from "./Signup";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Demographics = props => {
  const intl = useIntl();
  const navigate = useNavigate();
  const signupContext = useContext(SignupContext);
  const { formStructure, onMassagePayload } = signupContext;

  const onReactiveFormSubmit = () => {
    navigate("/signup/summary");
  };

  return (
    <Container>
      <h5 className='pb-0 mb-0'>
        <FormattedMessage id='demographics' defaultMessage='demographics' />
      </h5>
      <div className='small fst-italic pb-2'>
        <FormattedMessage
          id='yourContactInformation'
          defaultMessage='yourContactInformation'
        />
      </div>
      {formStructure && formStructure.length > 0 && (
        <ReactiveForm
          parentClassName='reactive-form text-dark'
          structure={formStructure.filter(
            f =>
              ![
                "accountUserName",
                "accountEmail",
                "accountPassword",
                "accountConfirmPassword",
              ].includes(f.id),
          )}
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

export default Demographics;
