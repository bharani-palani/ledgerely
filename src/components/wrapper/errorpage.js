import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';

function ErrorPage() {
  const [appData] = useContext(AppContext);
  return (
    <div className="pt-5">
      <div className="pt-5">
        <div className="pt-5 text-center">
          <h1 className="">Oops!</h1>
          <h1 className="text-danger">404</h1>
          <div className="">Sorry, your requested page cannot be found!</div>
          <hr className="hr" />
          <div className="py-2">
            <Link to="/" className="btn btn-secondary me-2">
              <i className="fa fa-home" /> Home
            </Link>
            <a
              rel="noopener noreferrer"
              href={`mailto:${appData.email}`}
              className="btn btn-secondary"
            >
              <i className="fa fa-envelope" /> Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
