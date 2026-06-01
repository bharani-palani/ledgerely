import React, { useContext, useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const IdleReminder = ({ onStayLoggedIn, ...rest }) => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const totalSeconds = 60;
  const [remaining, setRemaining] = useState(60);
  const deadlineRef = useRef(Date.now() + totalSeconds * 1000);

  const logout = () => {
    userContext.setIdleState("active");
    userContext.addUserData(userContext.defUserData);
    userContext.setUserConfig(userContext.defUserConfig);
    userContext.setAppExpired(false);
    localStorage.setItem("userData", JSON.stringify(userContext.defUserData));
    localStorage.setItem("userConfig", JSON.stringify(userContext.defUserConfig));
    navigate("/");
  };

  useEffect(() => {
    // Set deadline when component mounts
    deadlineRef.current = Date.now() + totalSeconds * 1000;

    const updateRemaining = () => {
      const now = Date.now();
      const msLeft = deadlineRef.current - now;
      setRemaining(Math.max(0, Math.ceil(msLeft / 1000)));
    };

    // Update every second
    const interval = setInterval(updateRemaining, 1000);

    // Also update when tab regains focus
    const onFocus = () => {
      updateRemaining();
    };
    window.addEventListener("focus", onFocus);

    // Initial update
    updateRemaining();

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    if (remaining <= 0) {
      document.title = `${globalContext.appName}`;
      logout();
    }
  }, [remaining]);

  // Auto-close IdleReminder if idleState is not 'idle'
  useEffect(() => {
    if (userContext.idleState !== "idle" && rest.onHide) {
      rest.onHide();
    }
  }, [userContext.idleState, rest]);

  return (
    <Modal {...rest} style={{ zIndex: 10000 }} show={userContext.idleState === "idle" && rest.show}>
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage id='IdleTitle' defaultMessage='IdleTitle' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`p-0 rounded-bottom ${userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}>
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
            <FormattedMessage id='IdleActivityNote' defaultMessage='IdleActivityNote' values={{ n: remaining }} />
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <Button
              className='py-2 w-50 btn-bni me-1'
              onClick={() => {
                // Reset deadline and timer on stay logged in
                deadlineRef.current = Date.now() + totalSeconds * 1000;
                setRemaining(totalSeconds);
                onStayLoggedIn("active");
              }}
              size='sm'
            >
              <FormattedMessage id='stayLoggedIn' defaultMessage='stayLoggedIn' />
            </Button>
            <Button className='py-2 w-50 btn-bni' onClick={() => logout()} size='sm'>
              <FormattedMessage id='logout' defaultMessage='logout' />
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IdleReminder;
