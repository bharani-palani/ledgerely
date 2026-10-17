import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import useAxios, { requestTokens } from "../../services/apiServices";
import Encryption from "../../helpers/clientServerEncrypt";
import signInImage from "../../images/concept/signIn.png";
import banner from "../../images/banner/greenBanner.png";
import brandIcon from "../../images/logo/greenIconNoBackground.png";
import { UserContext } from "../../contexts/UserContext";
import { useIntl, FormattedMessage } from "react-intl";
import { getDeviceInfo } from "../../helpers/deviceInfo";

/**
 * Note; This page should not have intl18n
 */
export const SignupContext = createContext([{}, () => {}]);

const getFieldValue = (fields, id) => fields.find(field => field.id === id)?.value || "";

const Signup = () => {
  const encryption = new Encryption();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const { apiInstance, setToken } = useAxios();
  const globalContext = useContext(GlobalContext);
  const myAlertContext = useContext(MyAlertContext);
  const [searchParams] = useSearchParams();
  const [planCode, setPlanCode] = useState(null);
  const [openLoader, setOpenLoader] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formStructure = useMemo(
    () => [
      {
        id: "accountName",
        label: intl.formatMessage({
          id: "name",
          defaultMessage: "name",
        }),
        value: "",
        type: "text",
        required: true,
        placeholder: intl.formatMessage({ id: "enterName", defaultMessage: "Enter your name" }),
        validation: /^[a-zA-Z0-9 ]{5,50}$/,
        validationMessage: intl.formatMessage({ id: "inputDoesNotMatchCriteria", defaultMessage: "inputDoesNotMatchCriteria" }),
      },
      {
        id: "accountEmail",
        label: intl.formatMessage({
          id: "email",
          defaultMessage: "email",
        }),
        value: "",
        type: "email",
        required: true,
        placeholder: intl.formatMessage({ id: "enterValidEmail", defaultMessage: "Enter valid email" }),
        validation: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/,
        validationMessage: intl.formatMessage({ id: "enterValidEmail", defaultMessage: "enterValidEmail" }),
      },
      {
        id: "accountPassword",
        label: intl.formatMessage({
          id: "password",
          defaultMessage: "password",
        }),
        value: "",
        type: "password",
        required: true,
        placeholder: intl.formatMessage({ id: "password", defaultMessage: "Enter your password" }),
        validation: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/,
        validationMessage: [
          intl.formatMessage({ id: "thisFieldIsRequired", defaultMessage: "thisFieldIsRequired" }),
          intl.formatMessage({ id: "minimumLetters", defaultMessage: "minimumLetters" }, { n: 8 }),
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
          intl.formatMessage({ id: "atleastNNumber", defaultMessage: "atleastNNumber" }, { n: 1 }),
        ].join(", "),
      },
    ],
    [],
  );
  const [formValues, setFormValues] = useState(formStructure);

  useEffect(() => {
    const nextPlanCode = searchParams.get("planCode");
    if (nextPlanCode) setPlanCode(nextPlanCode);
  }, [searchParams]);

  const updateField = (id, value) => setFormValues(fields => fields.map(field => (field.id === id ? { ...field, value } : field)));
  const markFieldAsTouched = id => setTouchedFields(fields => ({ ...fields, [id]: true }));
  const getValidationMessage = field => {
    if (field.required && !field.value)
      return `"${field.label}" ${intl.formatMessage({ id: "thisFieldIsRequired", defaultMessage: "thisFieldIsRequired" })}`;
    if (field.value && !field.validation.test(field.value))
      return `"${field.label.toLowerCase()}" ${field?.validationMessage ? field?.validationMessage : ""}`;
  };
  const isValid = () => formValues.filter(field => field.required).every(field => !getValidationMessage(field));

  const postSignUp = async () => {
    const formdata = new FormData();
    const accountEmail = getFieldValue(formValues, "accountEmail");
    formdata.append("accountName", getFieldValue(formValues, "accountName"));
    formdata.append("accountEmail", getFieldValue(formValues, "accountEmail"));
    formdata.append("accountPassword", encryption.encrypt(getFieldValue(formValues, "accountPassword"), accountEmail));
    formdata.append("accountPlan", planCode || "");
    return apiInstance.post("/signUp", formdata);
  };

  const saveLog = response => {
    let spread = {};
    fetch("https://geolocation-db.com/json/")
      .then(response => {
        return response.json();
      })
      .then(res => {
        spread = {
          ...response,
          ...{ time: new Date().toString(), ip: res.IPv4 },
        };
      })
      .catch(() => {
        spread = {
          ...response,
          ...{ time: new Date().toString(), ip: "127.0.0.1" },
        };
      })
      .finally(() => {
        const formdata = new FormData();
        formdata.append("log", JSON.stringify(spread));
        apiInstance.post("/saveLog", formdata);
      });
  };

  const handleLoginResponse = async response => {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    localStorage.setItem("userData", JSON.stringify({ ...storedUserData, sessionId: response.sessionId }));
    let menuData = [];
    await userContext.getMenus("superAdmin", false).then(async data => {
      menuData = data;
    });
    await userContext.getUserConfig(response.tenantId).then(async res => {
      const uConfig = res?.data?.response;
      const save = {
        type: response.type,
        theme: uConfig?.webTheme,
        email: response.email,
        imageUrl: response.imageUrl,
        name: response.name,
        userName: response.userName,
        sessionId: response.sessionId,
        source: response.source,
        menu: menuData,
        description: "signUp",
      };

      const saveUserData = JSON.stringify(save);
      localStorage.setItem("userData", saveUserData);
      const saveUserConfig = JSON.stringify(uConfig);
      localStorage.setItem("userConfig", saveUserConfig);
      await userContext.updateBulkUserData(save);
      await userContext.setUserConfig(prev => ({ ...prev, ...uConfig }));
      import.meta.env.VITE_ENV !== "local" && saveLog(response);
    });
  };

  const loginAction = async tenantId => {
    const username = getFieldValue(formValues, "accountEmail");
    const password = getFieldValue(formValues, "accountPassword");
    const encryptedPassword = encryption.encrypt(password, username);
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", encryptedPassword);
    try {
      const { deviceId, deviceIdWasMissing, platform } = getDeviceInfo();
      formdata.append("deviceId", deviceId);
      formdata.append("deviceIdWasMissing", deviceIdWasMissing ? "1" : "0");
      formdata.append("platform", platform);
      const response = await apiInstance.post("/validateUser", formdata);
      const resp = response.data.response;
      const token = response.data.token;
      if (token) {
        setToken(token);
      }
      if (resp) {
        if (resp.sessionId) {
          const tokenRes = await requestTokens(resp.sessionId);
          setToken(tokenRes.data.response);
        }
        const obj = {
          tenantId: tenantId,
          userName: resp.user_name,
          sessionId: resp.sessionId,
          type: resp.user_type,
          email: resp.user_email,
          name: resp.user_display_name,
          imageUrl: resp.user_image,
          source: "self",
        };
        handleLoginResponse(obj);
      } else {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "invalidUserNameOrPassword",
            defaultMessage: "invalidUserNameOrPassword",
          }),
        });
      }
    } catch (error) {
      console.error("bbb", error);
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "somethingWentWrong",
          defaultMessage: "somethingWentWrong",
        }),
      });
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    setHasSubmitted(true);
    if (!isValid()) return;
    setOpenLoader(true);
    postSignUp()
      .then(response => {
        const tenantId = response.data.response;
        if (tenantId) {
          if (import.meta.env.VITE_ENV === "production" && typeof window.fbq === "function") window.fbq("track", "CompleteRegistration");
          loginAction(tenantId);
        } else {
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: "Error",
            content: "Unable to reach server",
          });
        }
      })
      .catch(() =>
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: "Error",
          content: "Something went wrong",
        }),
      )
      .finally(() => setOpenLoader(false));
  };

  const toggleFields = bool => {
    setFormValues(prev =>
      prev.map(item =>
        item.id === "accountPassword"
          ? {
              ...item,
              type: bool ? "text" : "password",
            }
          : item,
      ),
    );
  };

  const renderInput = field => {
    if (field.type === "hidden") return null;
    const icon = field.id === "accountName" ? "user" : field.id === "accountEmail" ? "envelope" : "lock";
    const message = getValidationMessage(field);
    const showError = (touchedFields[field.id] || hasSubmitted) && Boolean(message);
    return (
      <>
        <div className='input-group position-relative'>
          <span className='input-group-text bg-white border-end-0'>
            <i className={`fa fa-${icon} icon-bni`} />
          </span>
          <Form.Control
            id={field.id}
            type={field.type}
            value={field.value}
            placeholder={field.placeholder}
            onChange={event => updateField(field.id, event.target.value)}
            onBlur={() => markFieldAsTouched(field.id)}
            className='border-start-0 shadow-none'
          />
          {field.id === "accountPassword" && (
            <i
              onClick={() => toggleFields(field.type === "password")}
              className={`fa fa-${field.type !== "password" ? "eye" : "eye-slash"} position-absolute end-0 top-50 translate-middle cursor-pointer`}
            />
          )}
        </div>
        {showError && (
          <Form.Control.Feedback type='invalid' className='d-block'>
            {message}
          </Form.Control.Feedback>
        )}
      </>
    );
  };

  return (
    <SignupContext.Provider
      value={{
        formStructure: formValues,
        setFormStructure: setFormValues,
        onMassagePayload: updateField,
        planCode,
      }}
    >
      <main
        className='loginScreen signupScreen position-relative min-vh-100 d-flex align-items-center'
        style={{ backgroundImage: `url(${signInImage})` }}
      >
        <Container fluid>
          <Row className='justify-content-center mx-0'>
            <Col
              xs={12}
              sm={10}
              md={8}
              lg={6}
              xl={4}
              className='rounded-3 shadow-lg p-3 p-sm-4 border border-1'
              style={{
                background: "rgba(255, 255, 255, 0.45)",
                backdropFilter: "blur(12px) saturate(140%)",
                WebkitBackdropFilter: "blur(12px) saturate(140%)",
                borderColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <header className='text-center mb-4'>
                <div className='d-flex align-items-center justify-content-center gap-3 my-3'>
                  <img src={banner} alt={globalContext.appName || "Ledgerely"} className='img-fluid' width='250' />
                </div>
                <h1 className='h3 fw-bold mb-2'>
                  <FormattedMessage id='createAccount' defaultMessage='Create My Free account' />
                </h1>
                <p className='text-secondary mb-0 small'>
                  <FormattedMessage
                    id='createAccountTitle'
                    defaultMessage='Chat with AI and create stunning, dynamic visualizations to uncover insights and make smarter financial decisions.'
                  />
                </p>
              </header>
              <div className='text-center my-3'>
                <img src={brandIcon} alt='Ledgerely icon' className='img-fluid' width='100' height='100' />
              </div>
              <Form noValidate onSubmit={onSubmit} className=''>
                <Row className='g-3'>
                  {formValues.map(field => (
                    <Col xs={12} key={field.id}>
                      <Form.Label htmlFor={field.id} className='fw-semibold'>
                        {field.label}
                        {field.required && <span className='text-danger'> *</span>}
                      </Form.Label>
                      {renderInput(field)}
                    </Col>
                  ))}
                </Row>
                <Button type='submit' className='bni-bg text-dark border-0 w-100 mt-4 py-2 fw-semibold' disabled={openLoader}>
                  <FormattedMessage id='create' defaultMessage='Create' />
                </Button>
              </Form>
              <div className='text-center text-secondary my-2 d-flex align-items-center justify-content-center gap-2'>
                <span className=''>
                  <FormattedMessage id='allreadyHaveAnAcoount' defaultMessage='Already have an account?' />
                </span>
                <Link to='/' className='btn btn-sm btn-light px-3 glassBtn glassBtnLight'>
                  <FormattedMessage id='signIn' defaultMessage='Sign In' />
                </Link>
              </div>
              <div className='text-secondary small text-center'>
                <i className='fa fa-lock me-2' />
                <span>
                  <FormattedMessage id='signupFooter' defaultMessage='Your data is safe and secure with us.' />
                </span>
              </div>
              <hr className='' />
              <div className='d-flex align-items-center justify-content-between gap-2 py-2'>
                <a href={globalContext.termsOfServiceLink} target='_blank' rel='noreferrer' className='border rounded-pill px-3 py-1 btn btn-sm btn-light glassBtn glassBtnLight'>
                  {intl.formatMessage({
                    id: "termsAndConditions",
                    defaultMessage: "termsAndConditions",
                  })}
                </a>
                <a href={globalContext.privacyPolicyLink} target='_blank' rel='noreferrer' className='border rounded-pill px-3 py-1 btn btn-sm btn-light glassBtn glassBtnLight'>
                  {intl.formatMessage({
                    id: "privacyPolicy",
                    defaultMessage: "privacyPolicy",
                  })}
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Modal show={openLoader} centered backdrop='static' keyboard={false} size='sm'>
        <Modal.Body className='text-center p-4 bg-light rounded-3'>
          <i className='fa fa-circle-o-notch fa-spin fa-2x icon-bni' />
          <p className='mb-0 mt-2'>
            <FormattedMessage id='creatingAccount' defaultMessage='Creating your account...' />
          </p>
        </Modal.Body>
      </Modal>
    </SignupContext.Provider>
  );
};

export default Signup;
