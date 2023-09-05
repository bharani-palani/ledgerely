import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import ConfirmationModal from "../configuration/Gallery/ConfirmationModal";
import AdminLogin from "./adminLogin";
import { SignedUrl } from "../configuration/Gallery/SignedUrl";
// import GoogleLogin from "react-google-login";
// import CryptoJS from "crypto-js";
// import { encryptSaltKey } from "../configuration/crypt";
// import FacebookLogin from "react-facebook-login";
import { FormattedMessage, useIntl } from "react-intl";
import apiInstance from "../../services/apiServices";
import history from "../../history";

const LoginUser = props => {
  const { onLogAction } = props;
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const globalContext = useContext(GlobalContext);
  const [animateType, setAnimateType] = useState("");
  const [openModal, setOpenModal] = useState(false); // change to false
  /*
    Bounce types available @
    https://github.com/animate-css/animate.css/tree/a8d92e585b1b302f7749809c3308d5e381f9cb17
    */

  const handleLoginResponse = response => {
    userContext.getUserConfig(response.appId).then(res => {
      // to do: change this web logic
      const uConfig = res.data.response[0];

      const save = {
        type: response.type,
        theme: uConfig.webTheme,
        audioShown: uConfig.bgSongDefaultPlay === "1",
        videoShown: uConfig.bgVideoDefaultPlay === "1",
        email: response.email,
        imageUrl: response.imageUrl,
        name: response.name,
        userId: response.userId,
        source: response.source,
        menu: [],
      };
      userContext.updateBulkUserData(save);
      userContext.setUserConfig({ ...userContext.userConfig, ...uConfig });

      const saveUserData = JSON.stringify(save);
      localStorage.setItem("userData", saveUserData);
      const saveUserConfig = JSON.stringify(uConfig);
      localStorage.setItem("userConfig", saveUserConfig);

      onLogAction(response);
      saveLog(response);
      setAnimateType("slideInRight");
      history.push("/");
    });
  };

  const saveLog = response => {
    let spread = {};
    fetch("https://geolocation-db.com/json/")
      .then(response => {
        return response.json();
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
  };

  const onLogout = () => {
    userContext.addUserData(userContext.defUserData);
    userContext.setUserConfig(userContext.defUserConfig);
    localStorage.setItem("userData", JSON.stringify(userContext.defUserData));
    localStorage.setItem(
      "userConfig",
      JSON.stringify(userContext.defUserConfig),
    );
    onLogAction({});
    setOpenModal(false);
    history.push("/");
  };

  const onLogoutInit = id => {
    setOpenModal(true);
  };

  return (
    <React.Fragment>
      {userContext.openAppLoginModal && (
        <AdminLogin
          show={userContext.openAppLoginModal}
          size='sm'
          animation={false}
          style={{ zIndex: 9999 }}
          onClose={() => {
            userContext.setOpenAppLoginModal(false);
          }}
          handlesuccess={data => handleLoginResponse(data)}
        />
      )}
      <ConfirmationModal
        show={openModal}
        confirmationstring={intl.formatMessage({
          id: "sureToLogout",
          defaultMessage: "sureToLogout",
        })}
        handleHide={() => {
          setOpenModal(false);
        }}
        handleYes={() => onLogout()}
        size='md'
        animation={false}
      />
      {userContext.userData.userId ? (
        <div
          className={`d-print-none animate__animated animate__${animateType}`}
        >
          <div className='options welcomeText'>
            <FormattedMessage id='welcome' defaultMessage='welcome' />
          </div>
          <div className='options'>
            <div className='welcomeText pb-10'>{userContext.userData.name}</div>
          </div>
          <div className='options pt-3'>
            {["facebook", "google"].includes(userContext.userData.source) &&
              userContext.userData.imageUrl && (
                <img
                  className='userImage'
                  alt='userImage'
                  src={
                    userContext.userData.imageUrl ||
                    require("../../images/spinner-1.svg")
                  }
                />
              )}
            {userContext.userData.source === "self" &&
              userContext.userData.imageUrl && (
                <SignedUrl
                  mykey='userImage'
                  type='image'
                  appData={globalContext}
                  unsignedUrl={userContext.userData.imageUrl}
                  className='userImage'
                />
              )}
            <i
              onClick={onLogoutInit}
              title={intl.formatMessage({
                id: "logout",
                defaultMessage: "logout",
              })}
              className='fa fa-sign-out text-secondary cursor-pointer fs-4'
            />
          </div>
        </div>
      ) : (
        <div className='options'>
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
          {/* <div className='google'>
            <GoogleLogin
              clientId={CryptoJS.AES.decrypt(
                appData.google_login_auth_token,
                appData[encryptSaltKey],
              ).toString(CryptoJS.enc.Utf8)}
              buttonText=''
              render={renderProps => (
                <i
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='fa fa-google text-secondary cursor-pointer fs-4'
                />
              )}
              onSuccess={data => {
                const res = {
                  userId: data.profileObj.googleId,
                  type: "public",
                  source: "google",
                  email: data.profileObj.email,
                  name: data.profileObj.name,
                  imageUrl: data.profileObj.imageUrl,
                  rest: data,
                };
                handleLoginResponse(res);
              }}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <FacebookLogin
            appId={CryptoJS.AES.decrypt(
              appData.facebook_app_id,
              appData[encryptSaltKey],
            ).toString(CryptoJS.enc.Utf8)}
            fields='name,email,picture'
            isMobile={false}
            redirectUri={appData.web}
            callback={data => {
              if (data.status !== "unknown") {
                const res = {
                  userId: data.id,
                  type: "public",
                  source: "facebook",
                  email: data.email,
                  name: data.name,
                  imageUrl: data.picture.data.url,
                  rest: data,
                };
                handleLoginResponse(res);
              }
            }}
            cssClass='facebook-container'
            icon={
              <i
                className='fa fa-facebook text-secondary cursor-pointer fs-5'
                title='Sign in with Facebook'
              />
            }
            textButton=''
          /> */}
          <div className='d-flex align-items-center cursor-pointer'>
            <button
              className='btn btn-sm btn-outline-secondary rounded-pill'
              onClick={() => userContext.setOpenAppLoginModal(true)}
            >
              <FormattedMessage id='signIn' defaultMessage='signIn' />
            </button>
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
