import React from 'react';

function ErrorCatch(props) {
  // const { error, errorInfo } = props;
  return (
    <div className="">
      <div className="p-5">
        <div className="position-relative">
          <div className="position-absolute top-50 start-50 translate-middle-x">
            <div className="text-center">
              <i className="fa fa-exclamation-triangle fa-5x text-danger" />
              <h1>Something went wrong!</h1>
              <h6>Please contact administrator on this.</h6>
              <h6 className="error-details">
                This could be cause of some errors in your structure..
              </h6>
              {/* <div className="text-danger p-1 border border-danger rounded mb-2">
                {JSON.stringify(error)}
              </div>
              <div className="text-danger p-1 border border-danger rounded">
                {JSON.stringify(errorInfo)}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorCatch;
