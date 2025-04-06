import React, { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";

const VersionToaster = () => {
  const workerRef = useRef(null);
  const [showToast, setShowToast] = useState({
    status: false,
    newVersion: "",
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./versionWorker.js", import.meta.url),
      {
        type: "module",
      },
    );

    workerRef.current.onmessage = e => {
      if (e.data) {
        setShowToast({ status: true, newVersion: e.data });
      }
      workerRef.current.terminate();
      workerRef.current = null;
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

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
