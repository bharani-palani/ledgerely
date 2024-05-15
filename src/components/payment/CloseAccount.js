import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UserContext } from "../../contexts/UserContext";
import { useIntl } from "react-intl";
import apiInstance from "../../services/apiServices";

const ClosureContent = () => (
  <div className='d-flex align-items-center'>
    <i className='fa fa-thumbs-up pe-2 fa-2x' />
    <ol>
      <li>We have received your request.</li>
      <li>Your data will be safe with us for the next one year.</li>
      <li>
        You can revoke your account anytime here to continue using our services.
      </li>
      <li>
        One year from now, all your data will be automatically deleted. Please
        take a backup of it.
      </li>
      <li>
        <i className='fa fa-handshake-o pe-2' />
        Good bye, for now.
      </li>
    </ol>
  </div>
);

const ClosureHeading = () => <div>We are sorry to see you go</div>;
const RevokeHeading = () => <div>Welcome back</div>;
const RevokeContent = () => (
  <div>Your account is restored. Please continue using our services.</div>
);
const CloseAccount = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const [show, setShow] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const handleClose = () => setShow(false);
  const def = [
    { value: "notRelevantToMe", label: "Not relevant to me", checked: false },
    {
      value: "pricingNotComprehensive",
      label: "Pricing is not comprehensive",
      checked: false,
    },
    { value: "limitedFeatures", label: "Limited features", checked: false },
    { value: "performanceIssues", label: "Performance issues", checked: false },
    {
      value: "movingOtherVendor",
      label: "Moving to other vendor",
      checked: false,
    },
    { value: "others", label: "Others", checked: false },
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
      .catch(e => {
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
        .map(m => m.label)
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
      .catch(e => {
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
      <Modal show={show} onHide={handleClose} style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title className='d-flex align-items-center'>
            {!isClosed ? (
              <div className='d-flex align-items-center'>
                <span>We are sorry to see you go</span>
                <i className='ps-2 fa-2x fa fa-frown-o' />
              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <i className='pe-2 fa-2x fa fa-smile-o' />
                <span>Cancel deletion</span>
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
              <div className='pt-2'>Closing this account ?</div>
              <div className='py-2'>
                Please help us to serve you better, what made you to step out ?
              </div>
              {closeAccountReasons.map((cl, i) => (
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
                  <span className='ps-2'>{cl.label}</span>
                </label>
              ))}
              <textarea
                placeholder='Comments'
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
                  Close account
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className='py-2'>I changed my mind.. Let me,</div>
              <button
                className='w-100 btn btn-bni p-1 border-0'
                onClick={() => onRevokeAccount()}
              >
                Revoke account
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
        <span>Account closure</span>
      </div>
    </div>
  );
};

export default CloseAccount;
