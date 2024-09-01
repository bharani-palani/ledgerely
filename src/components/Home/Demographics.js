import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactiveForm from "../configuration/ReactiveForm";
import { FormattedMessage, useIntl } from "react-intl";
import { countryList } from "../../helpers/static";

const Demographics = props => {
  const intl = useIntl();
  const [formStructure, setFormStructure] = useState([]);
  const credentialForm = [
    {
      id: "accountAddress1",
      index: "accountAddress1",
      label: "Address 1",
      elementType: "text",
      value: "",
      placeHolder: "Address 1",
      className: "col-12",
    },
    {
      id: "accountAddress2",
      index: "accountAddress2",
      label: "Address 2",
      elementType: "text",
      value: "",
      placeHolder: "Address 2",
      className: "col-12",
    },
    {
      id: "accountCity",
      index: "accountCity",
      label: "City",
      elementType: "text",
      value: "",
      placeHolder: "City",
      className: "col-12",
    },
    {
      id: "accountState",
      index: "accountState",
      label: "State",
      elementType: "text",
      value: "",
      placeHolder: "State",
      className: "col-12",
    },
    {
      id: "accountPostalCode",
      index: "accountPostalCode",
      label: "Postal code",
      elementType: "number",
      value: "",
      placeHolder: "Postal code",
      className: "col-12",
    },
    {
      id: "accountCountry",
      index: "accountCountry",
      label: "Country",
      elementType: "dropDown",
      value: "",
      list: countryList.map(c => ({
        label: c.value,
        value: c.id,
      })),
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-12",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "accountCurrency",
      index: "accountCurrency",
      label: "Currency",
      elementType: "dropDown",
      value: "",
      list: [{ value: "INR", label: "INR" }],
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-12",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
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

export default Demographics;
