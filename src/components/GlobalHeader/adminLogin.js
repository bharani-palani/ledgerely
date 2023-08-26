import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "./loginForm";
import ResetForm from "./resetForm";
import ChangePassword from "./changePassword";
import { UserContext } from "../../contexts/UserContext";
import { useIntl } from "react-intl";

function AdminLogin(props) {
  const intl = useIntl();
  const { onClose, handlesuccess } = props;
  const userContext = useContext(UserContext);
  const [view, setView] = useState("login");
  const locale = {
    login: intl.formatMessage({ id: "login", id: "login" }),
    resetPassword: intl.formatMessage({
      id: "resetPassword",
      id: "resetPassword",
    }),
    changePassword: intl.formatMessage({
      id: "changePassword",
      id: "changePassword",
    }),
  };

  return (
    <Modal {...props} className='' size={"md"} centered>
      <Modal.Header>
        <Modal.Title>
          {view !== "login" && (
            <button
              onClick={() => setView("login")}
              className='btn btn-sm btn-default me-2'
            >
              <i className='fa fa-chevron-left' />
            </button>
          )}
          <span className='pl-5'>{locale[view]}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`rounded-bottom ${
          userContext.userData.theme === "dark"
            ? "bg-dark text-white"
            : "bg-white text-dark"
        }`}
      >
        <div className='text-dark'>
          {view === "login" && (
            <LoginForm
              onToggle={val => setView(val)}
              onClose={onClose}
              handlesuccess={handlesuccess}
            />
          )}
          {view === "resetPassword" && <ResetForm onClose={onClose} />}
          {view === "changePassword" && <ChangePassword onClose={onClose} />}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AdminLogin;
