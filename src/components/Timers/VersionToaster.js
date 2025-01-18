import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import packageJson from "../../../package.json";

const VersionToaster = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => {
        fetch(`${process.env.PUBLIC_URL}/meta.json?cacheDate=${Date.now()}`, {
          headers: {
            "Cache-Control": "no-cache",
          },
        })
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
      <div className='w-100 d-flex justify-content-between align-items-center'>
        New software update available
        <Button
          size='sm'
          variant='secondary'
          onClick={() => window.location.reload()}
        >
          <small>Reload</small>
        </Button>
      </div>
    );
  };

  const show = () => {
    toast["info"](<Container />, {
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
      theme: "dark",
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
