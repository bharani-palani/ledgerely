import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import AppContext from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';
import ConfirmationModal from '../configuration/Gallery/ConfirmationModal';
import AdminLogin from './adminLogin';
import SignedUrl from '../configuration/Gallery/SignedUrl';

const LoginUser = props => {
  const { onLogAction } = props;
  const userContext = useContext(UserContext);
  const [appData] = useContext(AppContext);
  const [animateType, setAnimateType] = useState('');
  const [openModal, setOpenModal] = useState(false); // change to false
  const [openAppLoginModal, setOpenAppLoginModal] = useState(false); // change to false

  /*
    Bounce types available @
    https://github.com/animate-css/animate.css/tree/a8d92e585b1b302f7749809c3308d5e381f9cb17
    */

  const handleLoginResponse = response => {
    const data = JSON.stringify(response);
    localStorage.setItem('userData', data);
    userContext.addUserData(JSON.parse(data));
    userContext.updateUserData('type', response.type);
    onLogAction(response);
    setAnimateType('slideInRight');
  };

  const errorGoogle = () => {
    userContext.renderToast({
      type: 'error',
      icon: 'fa fa-times-circle',
      message: 'Unable to fetch from Google API',
    });
  };

  const onLogout = () => {
    userContext.removeUserData([
      'email',
      'imageUrl',
      'name',
      'rest',
      'source',
      'userId',
    ]);
    userContext.updateUserData('type', 'public');
    localStorage.removeItem('userData');
    onLogAction({});
    setOpenModal(false);
  };

  const onLogoutInit = id => {
    setOpenModal(true);
  };

  return (
    <React.Fragment>
      {openAppLoginModal && (
        <AdminLogin
          show={openAppLoginModal}
          size="sm"
          animation={false}
          style={{ zIndex: 9999 }}
          onClose={() => setOpenAppLoginModal(false)}
          onSuccess={data => {
            const res = {
              userId: data.userId,
              source: 'self',
              type: data.type,
              email: data.email,
              name: data.name,
              imageUrl: data.imageUrl,
              rest: {},
            };
            handleLoginResponse(res);
          }}
        />
      )}
      <ConfirmationModal
        show={openModal}
        confirmationstring={`Are you sure to logout this session?`}
        handleHide={() => {
          setOpenModal(false);
        }}
        handleYes={() => onLogout()}
        size="md"
        animation={false}
      />
      {userContext.userData.userId ? (
        <div
          className={`d-print-none animate__animated animate__${animateType}`}
        >
          <div className="options welcomeText">Welcome</div>
          <div className="options">
            <div className="welcomeText pb-10">{userContext.userData.name}</div>
          </div>
          <div className="options pt-3">
            {userContext.userData.source === 'google' &&
              userContext.userData.imageUrl && (
                <img
                  className="userImage"
                  alt="userImage"
                  src={
                    userContext.userData.imageUrl ||
                    require('../../images/spinner-1.svg')
                  }
                />
              )}
            {userContext.userData.source === 'self' &&
              userContext.userData.imageUrl && (
                <SignedUrl
                  type="image"
                  appData={appData}
                  unsignedUrl={userContext.userData.imageUrl}
                  className="userImage"
                />
              )}
            <i
              onClick={onLogoutInit}
              title="Logout"
              className="fa fa-sign-out text-secondary cursor-pointer fs-4"
            />
          </div>
        </div>
      ) : (
        <div className="options">
          <div className="google">
            <GoogleLogin
              clientId={appData.google_login_auth_token}
              buttonText=""
              render={renderProps => (
                <i
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="fa fa-google text-secondary cursor-pointer fs-4"
                />
              )}
              onSuccess={data => {
                const res = {
                  userId: data.profileObj.googleId,
                  type: 'public',
                  source: 'google',
                  email: data.profileObj.email,
                  name: data.profileObj.name,
                  imageUrl: data.profileObj.imageUrl,
                  rest: data,
                };
                handleLoginResponse(res);
              }}
              onFailure={errorGoogle}
              cookiePolicy={'single_host_origin'}
            />
            {/*
              Note: 
              Maintain the above style for FB, instagram or any social login
              const res = {
                userId: data.profileObj.googleId,
                type: appData.google_id === data.profileObj.googleId ? "superAdmin" : "public", // deffered no logic
                type: "public",
                source: "google",
                email: data.profileObj.email,
                name: data.profileObj.name,
                imageUrl: data.profileObj.imageUrl,			
                rest: data
              }
              Plese dont change data structure. It will impact expected results.
            */}
          </div>
          <div>
            <i
              onClick={() => setOpenAppLoginModal(true)}
              className="fa fa-user text-secondary cursor-pointer fs-4"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

LoginUser.propTypes = {
  toggleSideBar: PropTypes.bool,
  userData: PropTypes.object,
};
LoginUser.defaultProps = {};

export default LoginUser;
