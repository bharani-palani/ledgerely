import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import packageJson from "../../../package.json";

const VersionToaster = () => {
  const [showToast, setShowToast] = useState({
    status: false,
    newVersion: "",
  });

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
            if (data.version !== `${packageJson.version}`) {
              setShowToast({ status: true, newVersion: data.version });
            }
          })
          .catch(() => {
            setShowToast({
              status: true,
              newVersion: "",
            });
          });
      },
      1000 * 5 * 60,
    );
    if (showToast.status) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [showToast]);

  const Container = () => {
    return (
      <div className='w-100 d-flex justify-content-between align-items-center'>
        <span>New update v{showToast.newVersion} available</span>
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
      {showToast.status && showToast.newVersion && show()}
    </>
  );
};

export default VersionToaster;
