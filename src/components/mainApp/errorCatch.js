import React, { useEffect } from "react";
import useAxios from "../../services/apiServices";

function ErrorCatch(props) {
  const apiInstance = useAxios();
  const { error, errorInfo } = props;

  useEffect(() => {
    if (process.env.REACT_APP_ENV !== "local") {
      const description = {
        message: error.message,
        stack: error.stack
          .split("\n")
          .map(s => s.replace("    ", ""))
          .filter(f => f),
        component: errorInfo.componentStack
          .split("\n")
          .map(s => s.replace("    ", ""))
          .filter(f => f),
      };
      const response = {
        name: "ErrorHandler",
        email: "errorHandler@ledgerely.com",
        source: "FE",
        type: "ReactError",
        description: JSON.stringify(description),
        userId: "XXX",
      };

      let spread = {};
      fetch("https://geolocation-db.com/json/")
        .then(r => {
          return r.json();
        })
        .then(res => {
          spread = {
            ...response,
            ...{ time: new Date().toString(), ip: res.IPv4 },
          };
        })
        .catch(() => {
          spread = {
            ...response,
            ...{ time: new Date().toString(), ip: "127.0.0.1" },
          };
        })
        .finally(() => {
          const formdata = new FormData();
          formdata.append("log", JSON.stringify(spread));
          apiInstance.post("/saveLog", formdata);
        });
    }
  }, [error, errorInfo]);

  return (
    <div className=''>
      <div className='p-2'>
        <div className='position-relative'>
          <div className='text-center'>
            <i className='fa fa-exclamation-triangle fa-5x text-danger' />
            <h2>Oops.. Something went wrong..</h2>
            <h6>Please report this to application developer.</h6>
            <a
              className='btn btn-sm btn-primary rounded-pill'
              href={`/${process.env.REACT_APP_SUBFOLDER}`}
            >
              Refresh
            </a>
          </div>
          <h6>Message</h6>
          <div className='alert alert-danger' role='alert'>
            {error.message.split("\n").map((m, i) => (
              <div key={i} className='text-break'>
                {m}
              </div>
            ))}
          </div>
          <h6>Stack</h6>
          <div className='alert alert-danger'>
            {error.stack.split("\n").map((m, i) => (
              <div key={i} className='text-break'>
                {m}
              </div>
            ))}
          </div>
          <h6>Component</h6>
          <div className='alert alert-danger'>
            {errorInfo.componentStack.split("\n").map((m, i) => (
              <div key={i} className='text-break'>
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorCatch;
