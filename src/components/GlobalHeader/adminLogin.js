import React, { useState } from "react";
import LoginForm from "./loginForm";
import ResetForm from "./resetForm";
import { useIntl } from "react-intl";

function AdminLogin(props) {
  const intl = useIntl();
  const { onClose, handlesuccess } = props;
  const [view, setView] = useState("login");
  const locale = {
    login: intl.formatMessage({ id: "login", id: "login" }),
    resetPassword: intl.formatMessage({
      id: "resetPassword",
      defaultMessage: "resetPassword",
    }),
    changePassword: intl.formatMessage({
      id: "changePassword",
      defaultMessage: "changePassword",
    }),
  };

  return (
    <div className='text-dark'>
      {view !== "login" && (
        <button
          onClick={() => setView("login")}
          className='btn btn-sm btn-default me-2'
        >
          <i className='fa fa-chevron-left' />
        </button>
      )}
      <span className='pl-5'>{locale[view]}</span>
      {view === "login" && (
        <LoginForm
          onToggle={val => setView(val)}
          onClose={onClose}
          handlesuccess={handlesuccess}
        />
      )}
      {view === "resetPassword" && <ResetForm onClose={onClose} />}
    </div>
  );
}

export default AdminLogin;
