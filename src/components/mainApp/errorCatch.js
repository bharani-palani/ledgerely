import React from "react";

function ErrorCatch(props) {
  const { error, errorInfo } = props;
  console.log("bbb", props);
  return (
    <div className=''>
      <div className='p-5'>
        <div className='position-relative'>
          <div className='position-absolute top-50 start-50 translate-middle-x'>
            <div className='text-center'>
              <i className='fa fa-exclamation-triangle fa-5x text-danger' />
              <h1>Something went wrong!</h1>
              <h6>Please send this to administrator in getting resolved.</h6>
            </div>
            <h6>Message</h6>
            <div className='alert alert-danger p-1 mb-2' role='alert'>
              {JSON.stringify(error.message)}
            </div>
            <h6>Stack</h6>
            <div className='alert alert-danger'>
              {error.stack.split("/n").map((m, i) => (
                <div key={i} className='small'>
                  {m}
                </div>
              ))}
            </div>
            <h6>Component</h6>
            <div className='alert alert-danger'>
              {errorInfo.componentStack.split("/n").map((m, i) => (
                <div key={i} className='small'>
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorCatch;
