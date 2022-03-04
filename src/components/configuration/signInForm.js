import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import helpers from "../../helpers";


function SignInForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const [viewMode, setViewMode] = useState("Configure");

  useEffect(() => {
    props.onCredentialUpdate({ username, password, viewMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, username, viewMode]);

  const onEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      props.onEnter(true);
    }
  };
  return (
    <div className="row">
      <div className="col-lg-12 py-2">
        <label htmlFor="username">User name</label>
        <input
          onChange={e => setUsername(e.target.value)}
          type="text"
          id="username"
          className="form-control"
          onKeyDown={e => onEnter(e)}
          placeholder="User name"
        />
      </div>
      <div className="col-lg-12 py-2">
          <label htmlFor="password">Password:</label>
          <div className="passwordArea">
            <input
              onChange={e => setPassword(e.target.value)}
              type={!type ? "password" : "text"}
              id="password"
              className="form-control"
              onKeyDown={e => onEnter(e)}
            />
            <i
              onClick={() => setType(!type)}
              className={`fa fa-${!type ? "eye" : "eye-slash"}`}
            />
          </div>
      </div>
      <div className="py-3 col-lg-12 text-center">
        <button onClick={() => props.showForgot(true)} className="btn btn-sm btn-primary">
          Change Password
        </button>
      </div>
    </div>
  );
}

export default SignInForm;
