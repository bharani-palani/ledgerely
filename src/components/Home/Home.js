import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

function Home(props) {
  const userContext = useContext(UserContext);
  return (
    <div className="mt-3 container-fluid">
      <div className="p-2 mb-2 rounded bni-bg bni-text">
        Hey, Welcome to Bharani&lsquo;s private portal..
      </div>
      <div className="row">
        {userContext.userData.menu.map(m => (
          <div key={m.page_id} className={`col-md-3 text-black mb-1`}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">{m.label}</h5>
                <div className="text-center"><i className={`fa-5x p-2 ${m.icon}`} /></div>
                <p className="card-text">{m.description}</p>
                <div className="d-grid gap-2">
                  <Link
                    className="btn btn-bni"
                    to={m.href}
                  >
                    Click here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
