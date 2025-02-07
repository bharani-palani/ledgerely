import React, { useContext, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const IdleReminder = ({ onStayLoggedIn, ...rest }) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const totalSeconds = 60;
  const [remaining, setRemaining] = useState(60);

  const logout = () => {
    userContext.addUserData(userContext.defUserData);
    userContext.setUserConfig(userContext.defUserConfig);
    userContext.setAppExpired(false);
    localStorage.setItem("userData", JSON.stringify(userContext.defUserData));
    localStorage.setItem(
      "userConfig",
      JSON.stringify(userContext.defUserConfig),
    );
    navigate("/");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (remaining <= 0) {
      logout();
    }
  }, [remaining]);

  return (
    <Modal {...rest} style={{ zIndex: 10000 }}>
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage id='IdleTitle' defaultMessage='IdleTitle' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`p-0 rounded-bottom ${
          userContext.userData.theme === "dark"
            ? "bg-dark text-white"
            : "bg-white text-dark"
        }`}
      >
        <div
          className='progress'
          style={{
            borderRadius: 0,
            height: "5px",
          }}
        >
          <div
            className='progress-bar'
            style={{
              height: "5px",
              borderRadius: 0,
              width: `${(remaining / totalSeconds) * 100}%`,
              opacity: 0.9,
            }}
          >
            &nbsp;
          </div>
        </div>
        <div className='p-3'>
          <div className='py-2'>
            <FormattedMessage
              id='IdleActivityNote'
              defaultMessage='IdleActivityNote'
              values={{ n: remaining }}
            />
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <Button
              className='py-2 w-50 btn-bni me-1'
              onClick={() => onStayLoggedIn("active")}
              size='sm'
            >
              <FormattedMessage
                id='stayLoggedIn'
                defaultMessage='stayLoggedIn'
              />
            </Button>
            <Button
              className='py-2 w-50 btn-bni'
              onClick={() => logout()}
              size='sm'
            >
              <FormattedMessage id='logout' defaultMessage='logout' />
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IdleReminder;
