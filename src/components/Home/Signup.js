import React, { useContext, useState, useEffect, createContext } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { countryList } from "../../helpers/static";
import { useIntl, FormattedMessage } from "react-intl";
import brandLogo from "../../images/logo/brandLogo.png";
import apiInstance from "../../services/apiServices";
import { MyAlertContext } from "../../contexts/AlertContext";

export const SignupContext = createContext([{}, () => {}]);

const Signup = () => {
  const intl = useIntl();
  const myAlertContext = useContext(MyAlertContext);
  const globalContext = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [pages, setPages] = useState([
    {
      id: "credentials",
      path: "/signup/credentials",
      status: false,
    },
    {
      id: "demographics",
      path: "/signup/demographics",
      status: false,
    },
    {
      id: "summary",
      path: "/signup/summary",
      status: false,
    },
  ]);

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
      id: "accountUserName",
      index: "accountUserName",
      label: intl.formatMessage({ id: "userName", defaultMessage: "userName" }),
      elementType: "text",
      value: "",
      placeHolder: "User name",
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
  ];
  const [formStructure, setFormStructure] = useState(credentialForm);

  const fetchIfAppUserExist = (email, uname) => {
    const formdata = new FormData();
    formdata.append("accountEmail", email);
    formdata.append("accountUserName", uname);
    return apiInstance.post("checkAppUserExists", formdata);
  };

  const onMassagePayload = (index, value) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.value = value;
      }
      return backup;
    });
    setFormStructure(backupStructure);
    const newArr = [...pages].map(f => {
      f.status = false;
      return f;
    });
    setPages(newArr);
  };

  useEffect(() => {
    myAlertContext.setConfig({
      show: false,
    });
    navigate("/signup/credentials");
    return () => {
      myAlertContext.setConfig({
        show: false,
      });
    };
  }, []);

  useEffect(() => {
    const email = formStructure.filter(f => ["accountEmail"].includes(f.id))[0]
      .value;
    const uname = formStructure.filter(f =>
      ["accountUserName"].includes(f.id),
    )[0].value;
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
    const uNameValidation = /^[a-zA-Z0-9 ]{4,50}$/g;

    const validEmail = new RegExp(emailValidation).test(email);
    const validUname = new RegExp(uNameValidation).test(uname);
    if (validEmail && validUname) {
      fetchIfAppUserExist(email, uname).then(res => {
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
              id: "userAlreadyExist",
              defaultMessage: "userAlreadyExist",
            }),
          });
        } else {
          myAlertContext.setConfig({
            show: false,
          });
        }
      });
    }
  }, [
    formStructure.filter(f => ["accountEmail"].includes(f.id))[0].value,
    formStructure.filter(f => ["accountUserName"].includes(f.id))[0].value,
  ]);

  return (
    <SignupContext.Provider
      value={{
        pages,
        setPages,
        credentialForm,
        formStructure,
        setFormStructure,
        onMassagePayload,
      }}
    >
      <div className='signUp'>
        <Row className='m-0'>
          <Col lg={3} xl={2} className='p-0 position-relative'>
            <div className='text-dark d-flex align-items-center'>
              <Col xs={2} className='bni-bg text-dark py-3 text-center'>
                <Link size='sm' className='btn-link text-dark' to={"/"}>
                  <i className='fa fa-angle-double-left' />
                </Link>
              </Col>
              <Col xs={8} className='bni-bg text-dark py-3'>
                <div className='text-center'>{globalContext.appName}</div>
              </Col>
              <Col xs={2} className='text-center p-2 bg-secondary'>
                <img className='brand img-fluid' src={brandLogo} />
              </Col>
            </div>
            <ul className='small p-2 m-0 pt-3 menuList'>
              {pages.map((page, i) => (
                <React.Fragment key={page.id}>
                  <li className={`d-flex align-items-center`}>
                    <span
                      className={`stepNumber rounded-circle d-flex align-items-center justify-content-center me-1 ${location.pathname === page.path ? "bni-bg text-dark" : "bg-secondary text-white"}`}
                    >
                      {page.status ? <i className='fa fa-check' /> : i + 1}
                    </span>
                    <Link
                      to={page.path}
                      className='text-dark d-block'
                      relative='path'
                      //   style={{ pointerEvents: "none" }}
                    >
                      <FormattedMessage id={page.id} defaultMessage={page.id} />
                    </Link>
                  </li>
                  {i !== pages.length - 1 && <li className='line'></li>}
                </React.Fragment>
              ))}
            </ul>
          </Col>
          <Col lg={9} xl={10} className='wrapper p-0'>
            <Container>
              <h4 className='pt-3'>
                {intl.formatMessage({ id: "signUp", defaultMessage: "signUp" })}
              </h4>
            </Container>
            <Outlet />
          </Col>
        </Row>
      </div>
    </SignupContext.Provider>
  );
};

export default Signup;
