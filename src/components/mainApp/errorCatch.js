import React from "react";

function ErrorCatch(props) {
  const { error, errorInfo } = props;

  return (
    <div className=''>
      <div className='p-5'>
        <div className='position-relative'>
          <div className='position-absolute top-50 start-50 translate-middle-x'>
            <div className='text-center'>
              <i className='fa fa-exclamation-triangle fa-5x text-danger' />
              <h1>Oops... Something went wrong...</h1>
              <h6>Please report this to administrator.</h6>
            </div>
            <h6>Message</h6>
            <div className='alert alert-danger p-1 mb-2' role='alert'>
              {error.message.split("\n").map((m, i) => (
                <div key={i}>{m}</div>
              ))}
            </div>
            <h6>Stack</h6>
            <div className='alert alert-danger'>
              {error.stack.split("\n").map((m, i) => (
                <div key={i} className='small'>
                  {m}
                </div>
              ))}
            </div>
            <h6>Component</h6>
            <div className='alert alert-danger'>
              {errorInfo.componentStack.split("\n").map((m, i) => (
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
