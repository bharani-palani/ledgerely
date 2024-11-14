import React from "react";

function ErrorCatch(props) {
  const { error, errorInfo } = props;
  return (
    <div className=''>
      <div className='p-2'>
        <div className='position-relative'>
          <div className='text-center'>
            <i className='fa fa-exclamation-triangle fa-5x text-danger' />
            <h2>Oops.. Something went wrong..</h2>
            <h6>Please report this to application developer.</h6>
            <a className='btn btn-sm btn-primary rounded-pill' href='/'>
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
