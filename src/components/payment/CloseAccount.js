import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UserContext } from "../../contexts/UserContext";
import { useIntl } from "react-intl";
import useAxios from "../../services/apiServices";
import { FormattedMessage } from "react-intl";

const ClosureContent = () => (
  <div className='d-flex align-items-center'>
    <i className='fa fa-thumbs-up pe-2 fa-2x' />
    <ol>
      <li>
        <FormattedMessage
          id='receivedRequest'
          defaultMessage='receivedRequest'
        />
      </li>
      <li>
        <FormattedMessage id='dataSafety' defaultMessage='dataSafety' />
      </li>
      <li>
        <FormattedMessage id='revokeAnytime' defaultMessage='revokeAnytime' />
      </li>
      <li>
        <FormattedMessage id='autoDelete' defaultMessage='autoDelete' />
      </li>
      <li>
        <i className='fa fa-handshake-o pe-2' />
        <FormattedMessage id='goodBye' defaultMessage='goodBye' />
      </li>
    </ol>
  </div>
);

const ClosureHeading = () => (
  <div>
    <FormattedMessage id='sorryToGo' defaultMessage='sorryToGo' />
  </div>
);
const RevokeHeading = () => (
  <div>
    <FormattedMessage id='welcomeBack' defaultMessage='welcomeBack' />
  </div>
);
const RevokeContent = () => (
  <div>
    <FormattedMessage id='accountRestore' defaultMessage='accountRestore' />
  </div>
);
const CloseAccount = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const [show, setShow] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const handleClose = () => setShow(false);
  const def = [
    {
      value: "notRelevantToMe",
      checked: false,
    },
    {
      value: "pricingNotComp",
      checked: false,
    },
    {
      value: "limitedFeatures",
      checked: false,
    },
    {
      value: "others",
      checked: false,
    },
  ];
  const [closeAccountReasons, setCloseAccountReasons] = useState(def);
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (show) {
      const formdata = new FormData();
      formdata.append("appId", userContext.userConfig.appId);
      apiInstance
        .post("/payments/checkClosure", formdata)
        .then(res => {
          const bool = res.data.response;
          setIsClosed(bool);
        })
        .catch(e => console.log("bbb", e));
    }
  }, [show]);

  const onRevokeAccount = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("/payments/revokeAccount", formdata)
      .then(res => {
        const bool = res.data.response;
        if (bool) {
          myAlertContext.setConfig({
            show: true,
            className: "alert-success border-0 text-dark",
            type: "success",
            dismissible: true,
            heading: <RevokeHeading />,
            content: <RevokeContent />,
          });
        }
      })
      .catch(() => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      })
      .finally(() => handleClose());
  };

  const onCloseAccount = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    formdata.append(
      "selections",
      closeAccountReasons
        .filter(f => f.checked)
        .map(m => m.value)
        .join(", "),
    );
    formdata.append("comments", comments);
    apiInstance
      .post("/payments/accountClosure", formdata)
      .then(res => {
        const bool = res.data.response;
        if (bool) {
          setCloseAccountReasons(def);
          setComments("");
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: <ClosureHeading />,
            content: <ClosureContent />,
          });
        }
      })
      .catch(() => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      })
      .finally(() => handleClose());
  };

  return (
    <div className='py-3'>
      <Modal show={show} onHide={handleClose} style={{ zIndex: 10000 }}>
        <Modal.Header closeButton>
          <Modal.Title className='d-flex align-items-center'>
            {!isClosed ? (
              <div className='d-flex align-items-center'>
                <FormattedMessage id='sorryToGo' defaultMessage='sorryToGo' />
                <i className='ps-2 fa-2x fa fa-frown-o' />
              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <i className='pe-2 fa-2x fa fa-smile-o' />
                <FormattedMessage
                  id='cancelDeletion'
                  defaultMessage='cancelDeletion'
                />
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`rounded-bottom ${
            userContext.userData.theme === "dark"
              ? "bg-dark text-white"
              : "bg-white text-dark"
          }`}
        >
          {!isClosed ? (
            <div>
              <div className='pt-2'>
                <FormattedMessage
                  id='closeThisAccount'
                  defaultMessage='closeThisAccount'
                />
              </div>
              <div className='py-2'>
                <FormattedMessage
                  id='serveYouBetter'
                  defaultMessage='serveYouBetter'
                />
              </div>
              {closeAccountReasons.map(cl => (
                <label key={cl.value} htmlFor={cl.value} className='d-block'>
                  <input
                    id={cl.value}
                    name='reasons'
                    type='checkbox'
                    onChange={e =>
                      setCloseAccountReasons(prevState => {
                        return prevState.map(obj =>
                          obj.value === cl.value
                            ? Object.assign(obj, { checked: e.target.checked })
                            : obj,
                        );
                      })
                    }
                    checked={cl.checked}
                  />
                  <span className='ps-2'>
                    <FormattedMessage id={cl.value} defaultMessage={cl.value} />
                  </span>
                </label>
              ))}
              <textarea
                placeholder={intl.formatMessage({
                  id: "comments",
                  defaultMessage: "comments",
                })}
                rows={5}
                style={{ resize: "none" }}
                className='form-control my-2'
                value={comments}
                onChange={e => setComments(e.target.value)}
              />
              <div>
                <Button
                  disabled={
                    !(closeAccountReasons.some(s => s.checked) && comments)
                  }
                  variant='danger'
                  className='w-100 my-2'
                  onClick={() => onCloseAccount()}
                >
                  <FormattedMessage
                    id='closeThisAccount'
                    defaultMessage='closeThisAccount'
                  />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className='py-2'>
                <FormattedMessage
                  id='changedMind'
                  defaultMessage='changedMind'
                />
              </div>
              <button
                className='w-100 btn btn-bni p-1 border-0'
                onClick={() => onRevokeAccount()}
              >
                <FormattedMessage
                  id='revokeAccount'
                  defaultMessage='revokeAccount'
                />
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <div
        onClick={() => setShow(true)}
        className='link-danger cursor-pointer d-flex align-items-center justify-content-center'
      >
        <i className='fa fa-frown-o fa-2x pe-2' />
        <FormattedMessage id='accountClosure' defaultMessage='accountClosure' />
      </div>
    </div>
  );
};

export default CloseAccount;
