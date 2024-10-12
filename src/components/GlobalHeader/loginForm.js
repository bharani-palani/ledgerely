import React, { useState, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "../resuable/Loader";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";

function LoginForm(props) {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const { onToggle, handlesuccess } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const [loader, setLoader] = useState(false);

  const onEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      loginAction();
    }
  };

  const loginAction = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    await apiInstance
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
            imageUrl: resp.user_image,
            source: "self",
          };
          handlesuccess(obj);
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
          <div className='pt-3 col-lg-12'>
            <div className='row'>
              <div className='col-md-6 pb-3'>
                <div className='d-grid gap-2'>
                  <button
                    onClick={() => loginAction()}
                    className='btn btn-bni rounded-0'
                  >
                    <FormattedMessage id='submit' defaultMessage='submit' />
                  </button>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='d-grid gap-2'>
                  <button
                    onClick={() => onToggle("resetPassword")}
                    className='btn btn-md btn-dark icon-bni rounded-0'
                  >
                    <FormattedMessage
                      id='resetPassword'
                      defaultMessage='resetPassword'
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='login-loader text-center'>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default LoginForm;
