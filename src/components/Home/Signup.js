import React, { useContext, useState, useEffect, createContext } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { countryList } from "../../helpers/static";
import { useIntl } from "react-intl";
import brandLogo from "../../images/logo/brandLogo.png";

export const SignupContext = createContext([{}, () => {}]);

const Signup = () => {
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  const pages = [
    { id: "credentials", label: "Credentials", path: "/signup/credentials" },
    { id: "demographics", label: "Demographics", path: "/signup/demographics" },
  ];

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
      elementType: "email",
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
      id: "accountPassword",
      index: "accountPassword",
      label: intl.formatMessage({ id: "password", defaultMessage: "password" }),
      elementType: "password",
      value: "",
      placeHolder: "",
      className: "col-12",
      options: {
        required: true,
        validation:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})/,
        errorMsg: intl.formatMessage({
          id: "inputDoesNotMatchCriteria",
          defaultMessage: "inputDoesNotMatchCriteria",
        }),
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
    {
      id: "accountConfirmPassword",
      index: "accountConfirmPassword",
      label: intl.formatMessage({
        id: "retypePassword",
        defaultMessage: "retypePassword",
      }),
      elementType: "password",
      value: "",
      placeHolder: "",
      className: "col-12",
      options: {
        required: true,
        validation:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})/,
        errorMsg: intl.formatMessage({
          id: "inputDoesNotMatchCriteria",
          defaultMessage: "inputDoesNotMatchCriteria",
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
    {
      id: "accountAddress1",
      index: "accountAddress1",
      label: intl.formatMessage({
        id: "address1",
        defaultMessage: "address1",
      }),
      elementType: "text",
      value: "",
      placeHolder: "Address 1",
      className: "col-12",
    },
    {
      id: "accountAddress2",
      index: "accountAddress2",
      label: intl.formatMessage({
        id: "address2",
        defaultMessage: "address2",
      }),
      elementType: "text",
      value: "",
      placeHolder: "Address 2",
      className: "col-12",
    },
    {
      id: "accountCity",
      index: "accountCity",
      label: intl.formatMessage({
        id: "city",
        defaultMessage: "city",
      }),
      elementType: "text",
      value: "",
      placeHolder: "City",
      className: "col-12",
    },
    {
      id: "accountState",
      index: "accountState",
      label: intl.formatMessage({
        id: "state",
        defaultMessage: "state",
      }),
      elementType: "text",
      value: "",
      placeHolder: "State",
      className: "col-12",
    },
    {
      id: "accountPostalCode",
      index: "accountPostalCode",
      label: intl.formatMessage({
        id: "postalCode",
        defaultMessage: "postalCode",
      }),
      elementType: "number",
      value: "",
      placeHolder: "Postal code",
      className: "col-12",
    },
    {
      id: "accountCountry",
      index: "accountCountry",
      label: intl.formatMessage({
        id: "country",
        defaultMessage: "country",
      }),
      elementType: "dropDown",
      value: "IND",
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
      label: intl.formatMessage({
        id: "currency",
        defaultMessage: "currency",
      }),
      elementType: "dropDown",
      value: "INR",
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
  const [formStructure, setFormStructure] = useState(credentialForm);

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

  useEffect(() => {
    navigate("/signup/credentials");
  }, []);

  return (
    <SignupContext.Provider
      value={{
        credentialForm,
        formStructure,
        setFormStructure,
        onMassagePayload,
      }}
    >
      <Container className='signUp'>
        <Row>
          <Col lg={3} className='p-0'>
            <Row className='py-2 text-dark m-0'>
              <Col xs={2}>
                <Link size='sm' className='btn-link text-dark' to={"/"}>
                  <i className='fa fa-angle-double-left px-2' />
                </Link>
              </Col>
              <Col xs={8}>
                <div className='text-center'>Sign up</div>
              </Col>
              <Col xs={2}>
                <img
                  className='brand'
                  src={brandLogo}
                  style={{ width: "35px", height: "35px" }}
                />
              </Col>
            </Row>
            <ul className='small px-2 m-0 my-2' style={{ listStyle: "none" }}>
              {pages.map((page, i) => (
                <React.Fragment key={page.id}>
                  <li className={`d-flex align-items-center`}>
                    <span
                      className={`stepNumber rounded-circle d-flex align-items-center justify-content-center me-1 ${location.pathname === page.path ? "bni-bg text-dark" : "bg-secondary text-white"}`}
                    >
                      {i + 1}
                      {/* <i className='fa fa-check' /> */}
                    </span>
                    <Link
                      to={page.path}
                      className='text-dark d-block'
                      relative='path'
                    >
                      {page.label}
                    </Link>
                  </li>
                  {i !== pages.length - 1 && <li className='line'></li>}
                </React.Fragment>
              ))}
            </ul>
          </Col>
          <Col lg={9} className='wrapper p-0'>
            <div className='p-2 bni-bg text-dark'>
              <div className='d-flex justify-content-center'>
                {globalContext.appName}
              </div>
            </div>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </SignupContext.Provider>
  );
};

export default Signup;
