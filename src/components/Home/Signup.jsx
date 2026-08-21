import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import useAxios from "../../services/apiServices";
import Encryption from "../../helpers/clientServerEncrypt";
import banner from "../../images/banner/greenBanner.png";
import brandIcon from "../../images/logo/greenIconNoBackground.png";
import { UserContext } from "../../contexts/UserContext";
import { useIntl } from "react-intl";

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
      { id: "accountName", label: "Full Name", value: "", type: "text", required: true, validation: /^[a-zA-Z0-9 ]{5,50}$/ },
      { id: "accountEmail", label: "Email Address", value: "", type: "email", required: true, validation: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/ },
      {
        id: "accountPassword",
        label: "Password",
        value: "",
        type: "password",
        required: true,
        validation: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/,
      },
      { id: "accountCountry", label: "Country", value: "IND", type: "hidden", required: false, validation: /\S/ },
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
    if (field.required && !field.value) return `${field.label} is required`;
    if (field.value && !field.validation.test(field.value)) return `Enter a valid ${field.label.toLowerCase()}`;
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
      const response = await apiInstance.post("/validateUser", formdata);
      const resp = response.data.response;
      const token = response.data.token;
      if (token) {
        setToken(token);
      }
      if (resp) {
        const obj = {
          tenantId: tenantId,
          userName: resp.user_name,
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

  const renderInput = field => {
    if (field.type === "hidden") return null;
    const icon = field.id === "accountName" ? "user" : field.id === "accountEmail" ? "envelope" : "lock";
    const message = getValidationMessage(field);
    const showError = (touchedFields[field.id] || hasSubmitted) && Boolean(message);
    return (
      <>
        <div className='input-group'>
          <span className='input-group-text bg-white border-end-0'>
            <i className={`fa fa-${icon} icon-bni`} />
          </span>
          <Form.Control
            id={field.id}
            type={field.type}
            value={field.value}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            onChange={event => updateField(field.id, event.target.value)}
            onBlur={() => markFieldAsTouched(field.id)}
            className='border-start-0 shadow-none'
          />
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
      <main className='min-vh-100 d-flex align-items-center bg-light'>
        <Container fluid>
          <Row className='justify-content-center mx-0'>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className='rounded-3 shadow-lg p-3 p-sm-4'>
              <header className='text-center mb-4'>
                <div className='d-flex align-items-center justify-content-center gap-2 mb-3'>
                  <img src={brandIcon} alt='Ledgerely icon' className='img-fluid' width='40' height='40' />
                  <img src={banner} alt={globalContext.appName || "Ledgerely"} className='img-fluid' width='150' />
                </div>
                <h1 className='h3 fw-bold mb-2'>Create your account</h1>
                <p className='text-secondary mb-0'>Track and manage your finances with AI</p>
              </header>
              <Form noValidate onSubmit={onSubmit}>
                <Row className='g-3'>
                  {formValues
                    .filter(field => field.id !== "accountCountry")
                    .map(field => (
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
                  Create My Free Account
                </Button>
              </Form>
              <p className='text-center text-secondary mt-3 mb-4'>
                Already have an account?{" "}
                <Link to='/' className='text-decoration-none icon-bni fw-semibold'>
                  Log in
                </Link>
              </p>
              <hr />
              <p className='text-secondary small mt-4 mb-0 text-center'>
                <i className='fa fa-lock icon-bni me-2' />
                <span>Your data is safe and secure with us. We never share your information.</span>
              </p>
            </Col>
          </Row>
        </Container>
      </main>
      <Modal show={openLoader} centered backdrop='static' keyboard={false} size='sm'>
        <Modal.Body className='text-center p-4 bg-light rounded-3'>
          <i className='fa fa-circle-o-notch fa-spin fa-2x icon-bni' />
          <p className='mb-0 mt-2'>Creating your account...</p>
        </Modal.Body>
      </Modal>
    </SignupContext.Provider>
  );
};

export default Signup;
