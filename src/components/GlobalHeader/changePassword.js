import React, { useState, useContext, useEffect } from "react";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";
import { UserContext } from "../../contexts/UserContext";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

function ChangePassword(props) {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const { ...rest } = props;
  const userContext = useContext(UserContext);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [loader, setLoader] = useState(false);
  const [submitState, setSubmitState] = useState(true);

  const [CP, setCP] = useState(false);
  const [NP, setNP] = useState(false);
  const [RP, setRP] = useState(false);

  useEffect(() => {
    const conditions = [
      currentPass.length === 0,
      newPass.length === 0,
      repeatPass.length === 0,
      currentPass === newPass && currentPass === repeatPass,
      newPass !== repeatPass,
      !new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})/,
      ).test(newPass),
      !new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})/,
      ).test(repeatPass),
    ];
    setSubmitState(conditions.some(e => e === true));
  }, [currentPass, newPass, repeatPass]);

  const changeAction = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("userId", userContext.userData.userId);
    formdata.append("currentPass", currentPass);
    formdata.append("newPass", newPass);
    formdata.append("repeatPass", repeatPass);
    formdata.append("appId", userContext.userConfig.appId);

    apiInstance
      .post("/changePassword", formdata)
      .then(response => {
        const bool = response.data.response;
        if (bool) {
          userContext.renderToast({
            message: intl.formatMessage({
              id: "passwordSuccessfullyChanged",
              defaultMessage: "passwordSuccessfullyChanged",
            }),
          });
        } else {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "passwordChangeFailedInvalidCredentials",
              defaultMessage: "passwordChangeFailedInvalidCredentials",
            }),
          });
        }
      })
      .catch(() => {
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
        setNewPass("");
        setRepeatPass("");
      });
  };

  const renderCloneTooltip = (props, content, id) => {
    const Html = () =>
      content.length > 1 ? (
        <ul
          style={{
            listStyle: "decimal",
            padding: "10px",
            textAlign: "left",
            margin: "5px",
          }}
        >
          {content.map((c, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: c }} />
          ))}
        </ul>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content[0] }} />
      );
    return (
      <Tooltip
        style={{ zIndex: 10000 }}
        id={`tooltip-${id}`}
        className='in show'
        {...rest}
      >
        <Html key={`html-1`} />
      </Tooltip>
    );
  };

  const HelpContent = props => {
    const { label, id } = props;
    return (
      <OverlayTrigger
        placement='bottom'
        overlay={renderCloneTooltip(props, label, id)}
        trigger='click'
        rootClose
      >
        <i className='fa fa-question-circle help text-secondary cursor-pointer' />
      </OverlayTrigger>
    );
  };

  return (
    <div className='row'>
      <div className='col-xl-12'>
        {!loader ? (
          <>
            <div className='row'>
              <div className='col-lg-4 col-sm-6 py-2'>
                <div className='form-floating passwordArea'>
                  <input
                    onChange={e => {
                      setCurrentPass(e.target.value);
                      setCP(true);
                    }}
                    type='password'
                    className='form-control'
                    placeholder={intl.formatMessage({
                      id: "currentPassword",
                      defaultMessage: "currentPassword",
                    })}
                    onBlur={() => setCP(true)}
                    id='currentPassword'
                    autoComplete='none'
                  />
                  {CP && (
                    <i
                      className={`fa fa-${
                        currentPass.length > 0 ? "check good" : "times bad"
                      }`}
                    />
                  )}
                  <label htmlFor='currentPassword' className='text-dark'>
                    <FormattedMessage
                      id='currentPassword'
                      defaultMessage='currentPassword'
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-4 col-sm-6 py-2 position-relative'>
                <div className='form-floating passwordArea'>
                  <input
                    onChange={e => {
                      setNewPass(e.target.value);
                      setNP(true);
                    }}
                    type='password'
                    className='form-control'
                    placeholder={intl.formatMessage({
                      id: "newPassword",
                      defaultMessage: "newPassword",
                    })}
                    onBlur={() => setNP(true)}
                    id='newPassword'
                    autoComplete='new-password'
                  />
                  {NP && (
                    <i
                      className={`fa fa-${
                        newPass.length > 0 ? "check good" : "times bad"
                      }`}
                    />
                  )}
                  <label htmlFor='newPassword' className='text-dark'>
                    <FormattedMessage
                      id='newPassword'
                      defaultMessage='newPassword'
                    />
                  </label>
                </div>
                <div className='position-absolute bottom-0 end-0 px-3 py-2'>
                  <HelpContent
                    label={[
                      intl.formatMessage(
                        {
                          id: "minimumLetters",
                          defaultMessage: "minimumLetters",
                        },
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
                        {
                          id: "atleastNNumber",
                          defaultMessage: "atleastNNumber",
                        },
                        { n: 1 },
                      ),
                      intl.formatMessage({
                        id: "allTheAboveAreRequired",
                        defaultMessage: "allTheAboveAreRequired",
                      }),
                    ]}
                    id={1}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-4 col-sm-6 py-2'>
                <div className='form-floating passwordArea'>
                  <input
                    onChange={e => {
                      setRepeatPass(e.target.value);
                      setRP(true);
                    }}
                    type='password'
                    className='form-control'
                    placeholder={intl.formatMessage({
                      id: "retypePassword",
                      defaultMessage: "retypePassword",
                    })}
                    onBlur={() => setRP(true)}
                    id='repeatPassword'
                    autoComplete='retype-password'
                  />
                  {RP && (
                    <i
                      className={`fa fa-${
                        repeatPass.length > 0 && repeatPass === newPass
                          ? "check good"
                          : "times bad"
                      }`}
                    />
                  )}
                  <label htmlFor='repeatPassword' className='text-dark'>
                    <FormattedMessage
                      id='retypePassword'
                      defaultMessage='retypePassword'
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6 py-2'>
                <button
                  disabled={submitState}
                  onClick={() => changeAction()}
                  className='btn btn-bni'
                >
                  <FormattedMessage id='submit' defaultMessage='submit' />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className='login-loader text-center'>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
