import React, { useState, useContext, useEffect } from "react";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";
import MultipleAccountsSelect from "./MultipleAccountsSelect";
import GoogleLoginButton from "./GoogleLoginButton";
import AppleLoginButton from "./AppleLoginButton";
import Encryption from "../../helpers/clientServerEncrypt";

function LoginForm(props) {
  const { apiInstance, setToken } = useAxios();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const { onToggle, handlesuccess } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const [loader, setLoader] = useState(false);
  const [maPopup, setMaPopup] = useState(false);
  const [tenantIdList, setTenantIdList] = useState([]);
  const [gmail, setGmail] = useState("");
  const encryption = new Encryption();

  const onEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      loginAction();
    }
  };

  useEffect(() => {
    if (tenantIdList.length > 0) {
      setMaPopup(true);
    }
  }, [tenantIdList]);

  const loginAction = async () => {
    setLoader(true);
    const encryptedPassword = encryption.encrypt(password, username);
    setPassword(encryptedPassword);
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
        if (resp.tenantId.length > 1) {
          setTenantIdList(resp.tenantId);
        } else {
          const obj = {
            tenantId: resp.tenantId,
            userName: resp.user_name,
            type: resp.user_type,
            email: resp.user_email,
            name: resp.user_display_name,
            imageUrl: resp.user_image,
            source: "self",
          };
          handlesuccess(obj);
        }
      } else {
        setUsername("");
        setPassword("");
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
      setUsername("");
      setPassword("");
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "somethingWentWrong",
          defaultMessage: "somethingWentWrong",
        }),
      });
    } finally {
      setLoader(false);
    }
  };

  const googleLogInAction = async (idToken) => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("token", idToken);

    await apiInstance
      .post("/validateEmailProvider", formdata)
      .then(async response => {
        const resp = response.data.response;
        if (resp) {
          setGmail(resp.user_email);
          if (resp.tenantId.length > 1) {
            setTenantIdList(resp.tenantId);
            setMaPopup(true);
          } else {
            const obj = {
              tenantId: resp.tenantId,
              userName: resp.user_name,
              type: resp.user_type,
              email: resp.user_email,
              name: resp.user_display_name,
              imageUrl: resp.user_image,
              source: "google",
            };
            await handlesuccess(obj);
          }
        } else {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "errorYourMailIsInValid",
              defaultMessage: "errorYourMailIsInValid",
            }),
          });
        }
      })
      .catch(error => {
        console.error("bbb", error);
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "somethingWentWrong",
            defaultMessage: "somethingWentWrong",
          }),
        });
      })
      .finally(() => setLoader(false));
  };

  const appleLoginAction = async ({ email, givenName, familyName, user, idToken, authorizationCode, nonce }) => {
    setLoader(true);
    setGmail(email || "");
    const formdata = new FormData();
    formdata.append("idToken", idToken);
    formdata.append("authorizationCode", authorizationCode || "");
    formdata.append("user", user || "");
    formdata.append("email", email || "");
    formdata.append("username", [givenName, familyName].filter(Boolean).join(" "));
    formdata.append("nonce", nonce || "");

    await apiInstance
      .post("/auth/appleCallback", formdata)
      .then(async response => {
        const resp = response.data.response;
        const token = response.data.token;
        if (token) {
          setToken(token);
        }
        if (resp) {
          if (resp.tenantId.length > 1) {
            setTenantIdList(resp.tenantId);
            setMaPopup(true);
          } else {
            await handlesuccess({
              tenantId: resp.tenantId,
              userName: resp.user_name,
              type: resp.user_type,
              email: resp.user_email,
              name: resp.user_display_name,
              imageUrl: resp.user_image,
              source: "apple",
            });
          }
        } else {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "errorYourMailIsInValid",
              defaultMessage: "errorYourMailIsInValid",
            }),
          });
        }
      })
      .catch(error => {
        console.error("Apple login error:", error);
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "somethingWentWrong",
            defaultMessage: "somethingWentWrong",
          }),
        });
      })
      .finally(() => setLoader(false));
  };

  const onTenantIdClick = ({ tenantId, username }) => {
    const formdata = new FormData();
    formdata.append("tenantId", tenantId);
    formdata.append("username", username);

    apiInstance
      .post("/getMultiUserRoles", formdata)
      .then(async response => {
        const data = response.data.response;
        if (data) {
          const obj = {
            tenantId: [tenantId],
            userName: data.user_name,
            type: data.user_type,
            email: data.user_email,
            name: data.user_display_name,
            imageUrl: data.user_image,
            source: "self",
          };
          await handlesuccess(obj);
        } else {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "userNotAvailableForAccount",
              defaultMessage: "userNotAvailableForAccount",
            }),
          });
        }
      })
      .catch(error => {
        console.error("bbb", error);
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "somethingWentWrong",
            defaultMessage: "somethingWentWrong",
          }),
        });
      });
  };

  const googleLoginError = () => {
    userContext.renderToast({
      type: "error",
      icon: "fa fa-google",
      message: intl.formatMessage({
        id: "somethingWentWrong",
        defaultMessage: "somethingWentWrong",
      }),
    });
  };

  const appleLoginError = () => {
    userContext.renderToast({
      type: "error",
      icon: "fa fa-apple",
      message: intl.formatMessage({
        id: "somethingWentWrong",
        defaultMessage: "somethingWentWrong",
      }),
    });
  };

  return (
    <div>
      <MultipleAccountsSelect
        className='accountPlanner'
        show={maPopup}
        onHide={() => setMaPopup(false)}
        centered
        size='sm'
        backdrop='static'
        data={{ list: tenantIdList, username: gmail || username }}
        onTenantIdClick={onTenantIdClick}
      />
      <div className='row gy-2'>
        <div className='col-lg-12'>
          <div className='form-floating'>
            <input
              onChange={e => setUsername(e.target.value)}
              value={username}
              type='text'
              id='username'
              className='form-control shadow-none'
              onKeyDown={e => onEnter(e)}
              placeholder={intl.formatMessage({
                id: "userName",
                defaultMessage: "userName",
              })}
            />
            <label htmlFor='username'>
              <FormattedMessage id='email' defaultMessage='email' />
              {" / "}
              <FormattedMessage id='userName' defaultMessage='userName' />
            </label>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='form-floating'>
            <input
              onChange={e => setPassword(e.target.value)}
              type={!passwordType ? "password" : "text"}
              id='userPassword'
              className='form-control shadow-none pe-5'
              onKeyDown={e => onEnter(e)}
              placeholder={intl.formatMessage({
                id: "password",
                defaultMessage: "password",
              })}
              value={password}
            />
            <div className='d-flex gap-2 position-absolute top-50 align-items-center justify-content-end pe-2 end-0'>
              <i onClick={() => setPasswordType(!passwordType)} className={`fa fa-${!passwordType ? "eye" : "eye-slash"} cursor-pointer`} />
              <i onClick={() => setPassword("")} className={`fa fa-times-circle cursor-pointer`} />
            </div>
            <label htmlFor='userPassword'>
              <FormattedMessage id='password' defaultMessage='password' />
            </label>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='row gy-2'>
            <div className='col-sm-6 col-lg-12 pb-1'>
              <div className='d-grid gap-2'>
                <button onClick={() => loginAction()} className='btn btn-sm btn-bni bg-gradient py-2' disabled={loader}>
                  {!loader ? <FormattedMessage id='submit' defaultMessage='submit' /> : <i className='fa fa-circle-o-notch fa-spin fa-fw' />}
                </button>
              </div>
            </div>
            <div className='col-sm-6 col-lg-12 pb-1'>
              <div className='d-grid gap-2'>
                <button onClick={() => onToggle("resetPassword")} className='btn btn-sm btn-light text-danger border-danger border bg-gradient py-2'>
                  <FormattedMessage id='resetPassword' defaultMessage='resetPassword' />
                </button>
              </div>
            </div>
            <div className='col-sm-12 col-lg-12 pt-1'>
              <GoogleLoginButton
                onSuccess={credentialResponse => {
                  googleLogInAction(credentialResponse);
                }}
                onError={() => {
                  googleLoginError();
                }}
              />
            </div>
            <div className='col-sm-12 col-lg-12 pt-1'>
              <AppleLoginButton disabled={loader} onSuccess={appleLoginAction} onError={appleLoginError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
