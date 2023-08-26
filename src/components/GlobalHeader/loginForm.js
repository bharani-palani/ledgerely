import React, { useState, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";

function LoginForm(props) {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const { onToggle, onClose, handlesuccess } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const [loader, setLoader] = useState(false);

  const onEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      loginAction();
    }
  };

  const loginAction = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    apiInstance
      .post("/validateUser", formdata)
      .then(response => {
        const resp = response.data.response;
        if (resp) {
          const obj = {
            appId: resp.appId,
            userId: resp.user_id,
            type: resp.user_type,
            email: resp.user_email,
            name: resp.user_display_name,
            imageUrl: resp.user_image_url,
            theme: resp.theme,
            source: "self",
          };
          handlesuccess(obj);
          onClose();
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

  return (
    <div>
      {!loader ? (
        <div className='row'>
          <div className='col-lg-12 py-2'>
            <div className='form-floating'>
              <input
                onChange={e => setUsername(e.target.value)}
                type='text'
                id='username'
                className='form-control'
                onKeyDown={e => onEnter(e)}
                placeholder={intl.formatMessage({
                  id: "userName",
                  defaultMessage: "userName",
                })}
              />
              <label htmlFor='username'>
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
                className='form-control'
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
          <div className='pt-3 col-lg-12 text-center'>
            <div className='d-flex justify-content-around'>
              <button
                onClick={() => onToggle("changePassword")}
                className='btn btn-md btn-link'
              >
                <FormattedMessage
                  id='changePassword'
                  defaultMessage='changePassword'
                />
              </button>
              <button
                onClick={() => onToggle("resetPassword")}
                className='btn btn-md btn-link'
              >
                <FormattedMessage
                  id='resetPassword'
                  defaultMessage='resetPassword'
                />
              </button>
            </div>
          </div>
          <div className='pt-3 col-lg-12'>
            <div className='row'>
              <div className='col-lg-6 pb-3'>
                <div className='d-grid gap-2'>
                  <button onClick={() => loginAction()} className='btn btn-bni'>
                    <FormattedMessage id='submit' defaultMessage='submit' />
                  </button>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='d-grid gap-2'>
                  <button onClick={onClose} className='btn btn-secondary'>
                    <FormattedMessage id='cancel' defaultMessage='cancel' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='login-loader text-center'>
          <Loader
            type={helpers.loadRandomSpinnerIcon()}
            color={document.documentElement.style.getPropertyValue(
              "--app-theme-bg-color",
            )}
            height={100}
            width={100}
          />
        </div>
      )}
    </div>
  );
}

export default LoginForm;
