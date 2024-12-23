import React, { useState, useContext, useEffect } from "react";
import apiInstance from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../resuable/Loader";
import { FormattedMessage, useIntl } from "react-intl";

function ResetForm(props) {
  const intl = useIntl();
  const { onClose } = props;
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const [submitState, setSubmitState] = useState(true);
  const [sendState, setSendState] = useState(false);
  const [respId, setRespId] = useState(null);
  let [timer, setTimer] = useState(300);

  useEffect(() => {
    setSubmitState(
      !new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/).test(email),
    );
  }, [email]);

  const startTimer = () => {
    if (timer === 0) {
      stopTimer(startTimer);
    } else {
      timer--;
    }
    setTimer(timer);
    setTimeout(startTimer, 1000);
  };

  const stopTimer = () => {
    clearTimeout(startTimer);
  };

  useEffect(() => {
    if (sendState) {
      startTimer();
    }
  }, [sendState]);

  const sendOtpAction = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("email", email);

    apiInstance
      .post("/sendOtp", formdata)
      .then(response => {
        const userId = response.data.response;
        if (userId) {
          userContext.renderToast({
            message: intl.formatMessage({
              id: "OtpSuccessfullyMailedToYou",
              defaultMessage: "OtpSuccessfullyMailedToYou",
            }),
          });
          setRespId(userId);
          setSendState(true);
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
        console.error(error);
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "somethingWentWrong",
            defaultMessage: "somethingWentWrong",
          }),
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const validateOtpAction = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("otp", otp);
    formdata.append("id", respId);
    formdata.append("email", email);

    apiInstance
      .post("/resetPassword", formdata)
      .then(response => {
        const bool = response.data.response;
        if (bool) {
          userContext.renderToast({
            message: intl.formatMessage({
              id: "resetSuccess",
              defaultMessage: "resetSuccess",
            }),
          });
          onClose();
        } else {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "OtpFailed",
              defaultMessage: "OtpFailed",
            }),
          });
        }
      })
      .catch(error => {
        console.error(error);
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "somethingWentWrong",
            defaultMessage: "somethingWentWrong",
          }),
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div>
      {!loader ? (
        <div>
          {!sendState ? (
            <div className='form-floating mb-3'>
              <input
                onChange={e => {
                  setEmail(e.target.value);
                }}
                type='email'
                className='form-control shadow-none'
                placeholder={intl.formatMessage({
                  id: "yourEmailPlease",
                  defaultMessage: "yourEmailPlease",
                })}
                id='email'
              />
              <label htmlFor='email'>
                <FormattedMessage
                  id='yourEmailPlease'
                  defaultMessage='yourEmailPlease'
                />
              </label>
            </div>
          ) : (
            <div>
              <div className='form-floating mb-3'>
                <input
                  onChange={e => {
                    setOtp(e.target.value);
                  }}
                  type='number'
                  className='form-control'
                  placeholder={intl.formatMessage({
                    id: "enterOtp",
                    defaultMessage: "enterOtp",
                  })}
                  id='otp'
                />
                <label htmlFor='otp'>
                  <FormattedMessage id='enterOtp' defaultMessage='enterOtp' />
                </label>
              </div>
              <div className='pb-2'>
                <button
                  disabled={timer > 0}
                  onClick={() => sendOtpAction()}
                  className='btn btn-sm btn-primary'
                >
                  <FormattedMessage id='resendOtp' defaultMessage='resendOtp' />
                </button>
              </div>
              {timer > 0 && (
                <div className='pb-2 text-danger fst-italic'>
                  <FormattedMessage
                    id='enterOtp'
                    defaultMessage='enterOtp'
                    values={{ seconds: timer }}
                  />
                </div>
              )}
            </div>
          )}
          <div className='row'>
            <div className='col-lg-6 py-2'>
              <div className='d-grid'>
                {!sendState ? (
                  <button
                    disabled={submitState}
                    onClick={() => sendOtpAction()}
                    className='btn btn-bni'
                  >
                    <FormattedMessage id='reset' defaultMessage='reset' />
                  </button>
                ) : (
                  <button
                    onClick={() => validateOtpAction()}
                    className='btn btn-bni'
                  >
                    <FormattedMessage id='send' defaultMessage='send' />
                  </button>
                )}
              </div>
            </div>
            <div className='col-lg-6 py-2'>
              <div className='d-grid'>
                <button onClick={onClose} className='btn btn-secondary'>
                  <FormattedMessage id='cancel' defaultMessage='cancel' />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='login-loader text-center py-3'>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default ResetForm;
