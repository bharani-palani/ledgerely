import React, { useContext, useEffect } from "react";
import ReactiveForm from "../configuration/ReactiveForm";
import { useIntl, FormattedMessage } from "react-intl";
import { SignupContext } from "./Signup";
import { Container } from "react-bootstrap";

const Demographics = props => {
  const intl = useIntl();
  const signupContext = useContext(SignupContext);
  const { formStructure, pages, setPages, onMassagePayload } = signupContext;

  useEffect(() => {
    const country = formStructure.filter(f =>
      ["accountCountry"].includes(f.id),
    )[0].value;
    const name = formStructure.filter(f => ["accountName"].includes(f.id))[0]
      .value;
    const nameValidation = /^[a-zA-Z0-9 ]{4,50}$/g;
    const validName = new RegExp(nameValidation).test(name);

    if (validName && country) {
      const newArr = [...pages].map(f => {
        f.status = true;
        return f;
      });
      setPages(newArr);
    }
  }, [
    formStructure.filter(f => ["accountCountry"].includes(f.id))[0].value,
    formStructure.filter(f => ["accountName"].includes(f.id))[0].value,
  ]);

  const onReactiveFormSubmit = () => {
    alert("All good");
    console.log("bbb", formStructure);
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
            id: "signUp",
            defaultMessage: "signUp",
          })}
        />
      )}
    </Container>
  );
};

export default Demographics;
