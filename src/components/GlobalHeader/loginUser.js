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
  const [openModal, setOpenModal] = useState(false);

  const handleLoginResponse = response => {
    userContext.getUserConfig(response.appId).then(res => {
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
        appId: response.appId,
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
      history.push("/dashboard");
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
      {!userContext.userData.userId && (
        <AdminLogin
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
      {userContext.userData.userId && (
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
                    require("../../images/spinner-1.svg").default
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
