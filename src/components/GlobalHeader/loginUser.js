import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../contexts/UserContext";
import ConfirmationModal from "../configuration/Gallery/ConfirmationModal";
import AdminLogin from "./adminLogin";
// import GoogleLogin from "react-google-login";
// import CryptoJS from "crypto-js";
// import { encryptSaltKey } from "../configuration/crypt";
// import FacebookLogin from "react-facebook-login";
import { FormattedMessage, useIntl } from "react-intl";
import apiInstance from "../../services/apiServices";
import { useNavigate } from "react-router-dom";

const LoginUser = props => {
  const navigate = useNavigate();
  const { onLogAction } = props;
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  const handleLoginResponse = response => {
    let menuData = [];
    userContext.getMenus("superAdmin", false).then(async data => {
      menuData = data;
    });
    userContext.getUserConfig(response.appId).then(async res => {
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
        menu: menuData,
      };

      const saveUserData = JSON.stringify(save);
      localStorage.setItem("userData", saveUserData);
      const saveUserConfig = JSON.stringify(uConfig);
      localStorage.setItem("userConfig", saveUserConfig);
      await userContext.updateBulkUserData(save);
      await userContext.setUserConfig(prev => ({ ...prev, ...uConfig }));
      onLogAction(response);
      saveLog(response);
    });
  };

  // useEffect(() => {
  //   console.log("bbb", userContext);
  // }, [userContext]);

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
    navigate("/");
  };

  const onLogoutInit = () => {
    setOpenModal(true);
  };

  const copyTextToClipboard = async text => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
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
        <div className={`d-print-none`}>
          <div className='welcomeText d-flex justify-content-between'>
            <span>
              <i
                className='fa fa-clone cursor-pointer pe-1'
                onClick={() =>
                  copyTextToClipboard(userContext.userConfig.appId)
                }
              />
              <FormattedMessage id='accountId' defaultMessage='accountId' />
            </span>
            <span className='pb-10 text-truncate mw-100'>
              {userContext.userConfig.appId}
            </span>
          </div>
          <div className='welcomeText text-center text-truncate mw-100'>
            <span className='pe-1'>
              <FormattedMessage id='welcome' defaultMessage='welcome' />
            </span>
            <span className='pb-10'>{userContext.userData.name}</span>
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
            userContext.userData.imageUrl ? (
              <img
                className='rounded-circle'
                alt='userImage'
                style={{ height: "50px", width: "50px" }}
                src={`data:image/png;base64,${userContext.userData.imageUrl}`}
              />
            ) : (
              <i className='fa fa-user fa-2x' />
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

export default LoginUser;
