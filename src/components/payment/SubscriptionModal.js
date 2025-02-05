import React, { useContext, useEffect, useState } from "react";
import { Modal, ListGroup, Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";
import apiInstance from "../../services/apiServices";
import Loader from "../resuable/Loader";
import moment from "moment";
import ConfirmationModal from "../configuration/Gallery/ConfirmationModal";
import { BillingContext } from "./Billing";
import { MyAlertContext } from "../../contexts/AlertContext";

const SubscriptionModal = props => {
  const { ...rest } = props;
  const intl = useIntl();
  const myAlertContext = useContext(MyAlertContext);
  const userContext = useContext(UserContext);
  const billingContext = useContext(BillingContext);
  const { setSubscriptionModalShow } = billingContext;
  const [subscriptionData, setSubscriptionData] = useState({});
  const [loader, setLoader] = useState(false);
  const [sure, setSure] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const listConfig = [
    {
      type: "string",
      key: "customer_id",
      i18N: "customerId",
    },
    {
      type: "string",
      key: "id",
      i18N: "subscriptionId",
    },
    {
      type: "status",
      key: "status",
      i18N: "status",
    },

    {
      type: "time",
      key: "current_start",
      i18N: "subscriptionStart",
    },
    {
      type: "time",
      key: "current_end",
      i18N: "subscriptionEnd",
    },
    {
      type: "time",
      key: "charge_at",
      i18N: "nextPayment",
    },
  ];

  useEffect(() => {
    if (userContext.userConfig.razorPaySubscriptionId) {
      setLoader(true);
      const formdata = new FormData();
      formdata.append(
        "subscriptionId",
        userContext.userConfig.razorPaySubscriptionId,
      );
      apiInstance
        .post("/payments/razorpay/getSubscriptionDetails", formdata)
        .then(res => {
          setSubscriptionData(res.data.response);
        })
        .catch(() => setSubscriptionData(false))
        .finally(() => setLoader(false));
    }
  }, [userContext.userConfig.razorPaySubscriptionId]);

  const loaderComp = () => {
    return (
      <div className='relativeSpinner'>
        <Loader />
      </div>
    );
  };

  const RenderType = ({ type, children }) => {
    switch (type) {
      case "string":
        return (
          <div>
            {children}
            <i
              className='fa fa-copy ps-2 cursor-pointer text-primary'
              onClick={() => {
                navigator.clipboard.writeText(children);
                userContext.renderToast({
                  type: "success",
                  position: "bottom-center",
                  message: intl.formatMessage(
                    {
                      id: "fileValueCopiedToClipboard",
                      defaultMessage: "fileValueCopiedToClipboard",
                    },
                    { file: children },
                  ),
                });
              }}
            />
          </div>
        );
      case "status":
        return (
          <div
            className={`text-uppercase ${children === "active" ? "text-success" : "text-warning"}`}
          >
            {children}
          </div>
        );
      case "time":
        return (
          <div className={``}>
            {children
              ? moment.unix(children).format("MMM Do YYYY, h:mm a")
              : "-"}
          </div>
        );
      default:
        return <div>{children}</div>;
    }
  };

  const handleCancelSubscription = () => {
    const formdata = new FormData();
    formdata.append(
      "subscriptionId",
      userContext.userConfig.razorPaySubscriptionId,
    );
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("/payments/razorpay/cancelSubscription", formdata)
      .then(res => {
        const { status } = res.data.response;
        if (status === "cancelled") {
          userContext.setUserConfig(prev => ({
            ...prev,
            razorPaySubscriptionId: null,
          }));
          myAlertContext.setConfig({
            show: true,
            className: "alert-success border-0 text-dark",
            type: "success",
            dismissible: true,
            heading: intl.formatMessage({
              id: "success",
              defaultMessage: "success",
            }),
            content: intl.formatMessage({
              id: "subscriptionCancelledMesg",
              defaultMessage: "subscriptionCancelledMesg",
            }),
          });
        }
      })
      .catch(err => {
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: intl.formatMessage({
            id: "error",
            defaultMessage: "error",
          }),
          content: err.response.data.response.MESSAGE,
        });
      })
      .finally(() => {
        setOpenModal(false);
        setSubscriptionModalShow(false);
      });
  };
  return (
    <>
      {openModal && (
        <ConfirmationModal
          show={openModal}
          confirmationstring={intl.formatMessage({
            id: "sureToCancelSubscription",
            defaultMessage: "sureToCancelSubscription",
          })}
          handleHide={() => {
            setOpenModal(false);
            setSubscriptionModalShow(false);
          }}
          handleYes={() => handleCancelSubscription()}
          size='md'
          animation={false}
        />
      )}
      <Modal {...rest} style={{ zIndex: 10000 }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              id='subscriptionDetail'
              defaultMessage='subscriptionDetail'
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`rounded-bottom ${
            userContext.userData.theme === "dark"
              ? "bg-dark text-white"
              : "bg-white text-dark"
          }`}
        >
          {loader && loaderComp()}
          {!loader && Object.keys(subscriptionData).length > 0 && (
            <>
              <ListGroup>
                {listConfig.map((listConfig, i) => (
                  <ListGroup.Item
                    key={i}
                    className={`d-flex justify-content-between align-items-center pt-2 ${
                      userContext.userData.theme === "dark"
                        ? "bg-dark text-white border-secondary"
                        : "bg-white text-dark"
                    }`}
                  >
                    <div>
                      <FormattedMessage
                        id={listConfig.i18N}
                        defaultMessage={listConfig.i18N}
                      />
                    </div>
                    <RenderType type={listConfig.type}>
                      {subscriptionData[listConfig.key]}
                    </RenderType>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {sure && (
                <div className='py-2 small text-center'>
                  <FormattedMessage
                    id='subscriptionNote'
                    defaultMessage='subscriptionNote'
                    values={{
                      n: moment
                        .unix(subscriptionData.current_end)
                        .format("lll"),
                    }}
                  />
                </div>
              )}
              {userContext.userData.type === "superAdmin" && (
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor='areYouSure' className='d-block text-wrap'>
                    <input
                      id='areYouSure'
                      type='checkbox'
                      onChange={e => setSure(e.target.checked)}
                      checked={sure}
                    />
                    <small className='ps-2'>
                      <FormattedMessage
                        id='sureToCancelSubscription'
                        defaultMessage='sureToCancelSubscription'
                      />
                    </small>
                  </label>
                  <Button
                    size='sm'
                    className='pull-right mt-2'
                    variant='danger'
                    disabled={!sure}
                    onClick={() => setOpenModal(true)}
                  >
                    <FormattedMessage
                      id='cancelSubscription'
                      defaultMessage='cancelSubscription'
                    />
                  </Button>
                </div>
              )}
            </>
          )}
          {!loader && !subscriptionData && (
            <div className='text-center text-danger'>
              <FormattedMessage
                id='noSubscriptionFound'
                defaultMessage='noSubscriptionFound'
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubscriptionModal;
