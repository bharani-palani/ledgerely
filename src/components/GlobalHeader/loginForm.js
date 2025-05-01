import React, { useState, useContext, useEffect } from "react";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";
import MultipleAccountsSelect from "./MultipleAccountsSelect";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
  const [appIdList, setAppIdList] = useState([]);
  const [gmail, setGmail] = useState("");

  const onEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      loginAction();
    }
  };

  useEffect(() => {
    if (appIdList.length > 0) {
      setMaPopup(true);
    }
  }, [appIdList]);

  const loginAction = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    await apiInstance
      .post("/validateUser", formdata)
      .then(response => {
        const resp = response.data.response;
        const token = response.data.token;
        if (token) {
          setToken(token);
        }
        if (resp) {
          if (resp.appId.length > 1) {
            setAppIdList(resp.appId);
          } else {
            const obj = {
              appId: resp.appId,
              userId: resp.user_id,
              type: resp.user_type,
              email: resp.user_email,
              name: resp.user_display_name,
              imageUrl: resp.user_image,
              source: "self",
            };
            handlesuccess(obj);
          }
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

  const googleLogInAction = async ({ email, picture, name }) => {
    setLoader(true);
    setGmail(email);
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("username", name);

    await apiInstance
      .post("/validateGoogleUser", formdata)
      .then(async response => {
        const resp = response.data.response;
        const token = response.data.token;
        if (token) {
          setToken(token);
        }
        if (resp) {
          if (resp.appId.length > 1) {
            setAppIdList(resp.appId);
            setMaPopup(true);
          } else {
            const obj = {
              appId: resp.appId,
              userId: resp.user_id,
              type: resp.user_type,
              email: resp.user_email,
              name: resp.user_display_name,
              imageUrl: resp.user_image,
              avatarUrl: picture,
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

  const onAppIdClick = ({ appId, username }) => {
    const formdata = new FormData();
    formdata.append("appId", appId);
    formdata.append("username", username);

    apiInstance
      .post("/getMultiUserRoles", formdata)
      .then(async response => {
        const data = response.data.response;
        if (data) {
          const obj = {
            appId: data.appId,
            userId: data.user_id,
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
      icon: "fa fa-times-circle",
      message: intl.formatMessage({
        id: "userNotAvailableForAccount",
        defaultMessage: "userNotAvailableForAccount",
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
        data={{ list: appIdList, username: gmail || username }}
        onAppIdClick={onAppIdClick}
      />
      <div className='row pb-3'>
        <div className='col-lg-12 py-2'>
          <div className='form-floating'>
            <input
              onChange={e => setUsername(e.target.value)}
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
        <div className='col-lg-12 py-2'>
          <div className='form-floating passwordArea'>
            <input
              onChange={e => setPassword(e.target.value)}
              type={!passwordType ? "password" : "text"}
              id='userPassword'
              className='form-control shadow-none'
              onKeyDown={e => onEnter(e)}
              placeholder={intl.formatMessage({
                id: "password",
                defaultMessage: "password",
              })}
            />
            <i
              onClick={() => setPasswordType(!passwordType)}
              className={`fa fa-${!passwordType ? "eye" : "eye-slash"}`}
            />
            <label htmlFor='userPassword'>
              <FormattedMessage id='password' defaultMessage='password' />
            </label>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='row'>
            <div className='col-sm-6 col-lg-12 pb-1'>
              <div className='d-grid gap-2'>
                <button
                  onClick={() => loginAction()}
                  className='btn btn-sm btn-bni bg-gradient'
                  disabled={loader}
                >
                  {!loader ? (
                    <FormattedMessage id='submit' defaultMessage='submit' />
                  ) : (
                    <i className='fa fa-circle-o-notch fa-spin fa-fw' />
                  )}
                </button>
              </div>
            </div>
            <div className='col-sm-6 col-lg-12 pb-1'>
              <div className='d-grid gap-2'>
                <button
                  onClick={() => onToggle("resetPassword")}
                  className='btn btn-sm btn-secondary icon-bni bg-gradient'
                >
                  <FormattedMessage
                    id='resetPassword'
                    defaultMessage='resetPassword'
                  />
                </button>
              </div>
              <div className='col-sm-12 col-lg-12 pt-1'>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    googleLogInAction(decoded);
                  }}
                  onError={() => {
                    googleLoginError();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
