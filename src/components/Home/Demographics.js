import React, { useContext } from "react";
import ReactiveForm from "../configuration/ReactiveForm";
import { useIntl } from "react-intl";
import { SignupContext } from "./Signup";
import { Container } from "react-bootstrap";

const Demographics = props => {
  const intl = useIntl();
  const signupContext = useContext(SignupContext);
  const { formStructure, onMassagePayload } = signupContext;

  //   useEffect(() => {
  //     console.log("bbb", formStructure);
  //   }, [formStructure]);

  const onReactiveFormSubmit = () => {
    console.log("bbb", formStructure);
  };

  return (
    <Container className='py-2'>
      <h5 className='pt-2 pb-0 mb-0'>Demographics</h5>
      <div className='small fst-italic pb-2'>Your contact information</div>
      {formStructure && formStructure.length > 0 && (
        <ReactiveForm
          parentClassName='reactive-form text-dark'
          structure={formStructure.filter(
            f =>
              ![
                "accountName",
                "accountEmail",
                "accountMobile",
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
