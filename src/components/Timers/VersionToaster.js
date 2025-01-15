import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import packageJson from "../../../package.json";

const VersionToaster = () => {
  const userContext = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => {
        fetch(`${process.env.PUBLIC_URL}/meta.json`)
          .then(r => r.json())
          .then(data => {
            if (data.version !== packageJson.version) {
              setShowToast(true);
            }
          });
      },
      1000 * 5 * 60,
    );
    return () => clearInterval(id);
  }, []);

  const Container = () => {
    return (
      <div className='d-flex justify-content-between align-items-center small'>
        <small>
          <FormattedMessage
            id='newSoftwareUpdateAvailable'
            defaultMessage='newSoftwareUpdateAvailable'
          />
        </small>
        <Button
          size='sm'
          variant='secondary'
          onClick={() => window.location.reload()}
        >
          <small>
            <FormattedMessage id='reload' defaultMessage='reload' />
          </small>
        </Button>
      </div>
    );
  };

  const show = () => {
    toast(<Container />, {
      position: "bottom-left",
      autoClose: false,
      limit: 0,
      newestOnTop: false,
      rtl: false,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: 1,
      theme: userContext.userData.theme,
      closeButton: false,
    });
  };

  return (
    <>
      <ToastContainer />
      {showToast && show()}
    </>
  );
};

export default VersionToaster;
