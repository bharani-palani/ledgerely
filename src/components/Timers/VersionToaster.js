import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { toast, ToastContainer } from "react-toastify";
import { useCacheBuster } from "react-cache-buster";
import { Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";

const VersionToaster = () => {
  const { checkCacheStatus } = useCacheBuster();
  const userContext = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const d = checkCacheStatus();
      d.then(data => {
        setShowToast(true);
        console.log("bbb", data);
      })
        .catch(err => console.log("ccc", err))
        .finally(f => console.log("ddd", f));
    }, 1000 * 5);
    setTimeout(() => {
      clearInterval(id);
    }, 5 * 1000);
    return () => clearInterval(id);
  }, []);

  const Container = () => {
    return (
      <div className='d-flex justify-content-between align-items-center small'>
        <span>New software update available</span>
        <Button
          size='sm'
          variant='secondary'
          onClick={() => window.location.reload()}
        >
          {/* reload */}
          <FormattedMessage id='reload' defaultMessage='reload' />
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
