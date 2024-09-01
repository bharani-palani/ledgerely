import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactiveForm from "../configuration/ReactiveForm";
import { FormattedMessage, useIntl } from "react-intl";

const Credentials = props => {
  const intl = useIntl();
  const [formStructure, setFormStructure] = useState([]);
  const credentialForm = [
    {
      id: "accountName",
      index: "accountName",
      label: intl.formatMessage({ id: "name", defaultMessage: "name" }),
      elementType: "text",
      value: "",
      placeHolder: "Your name",
      className: "col-12",
      options: {
        required: true,
        validation: /^[a-zA-Z0-9 ]{4,50}$/g,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "accountEmail",
      index: "accountEmail",
      label: intl.formatMessage({ id: "email", defaultMessage: "email" }),
      elementType: "text",
      value: "",
      placeHolder: "your-email@mailbox.com",
      className: "col-12",
      options: {
        required: true,
        validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        errorMsg: intl.formatMessage({
          id: "enterValidEmail",
          defaultMessage: "enterValidEmail",
        }),
      },
    },
    {
      id: "accountMobile",
      index: "accountMobile",
      label: intl.formatMessage({ id: "mobile", defaultMessage: "mobile" }),
      elementType: "number",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({
        id: "mobile",
        defaultMessage: "mobile",
      }),
      className: "col-12",
      options: {
        required: true,
        validation: /^[0-9]{10}$/,
        errorMsg: intl.formatMessage({
          id: "enterValidMobileNumber",
          defaultMessage: "enterValidMobileNumber",
        }),
      },
    },
  ];

  useEffect(() => {
    setFormStructure(credentialForm);
  }, []);

  const onMassagePayload = (index, value) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.value = value;
        backup.updateStatus = true;
      }
      return backup;
    });
    setFormStructure(backupStructure);
  };

  //   useEffect(() => {
  //     console.log("bbb", formStructure);
  //   }, [formStructure]);

  const onReactiveFormSubmit = () => {
    console.log("bbb", formStructure);
  };
  return (
    <Container fluid>
      <h5 className='py-2'>
        <FormattedMessage id='accountInfo' defaultMessage='accountInfo' />
      </h5>
      {formStructure && formStructure.length > 0 && (
        <ReactiveForm
          parentClassName='reactive-form text-dark'
          structure={formStructure}
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
