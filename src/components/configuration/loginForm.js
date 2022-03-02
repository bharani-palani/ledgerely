import React, { useState, useEffect } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import SignInForm from "./signInForm";
import ChangePassword from "./changePassword";

function LoginForm(props) {
  // const [auth, setAuth] = useState(false); // change this to false
  const [fpass, setFpass] = useState(props.dForgot);
  const [cObj, setCobj] = useState({ username: "", password: "" });
  const [fObj, setFobj] = useState({ currentPass: "", newPass:"", repeatPass:"" });
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);


  const validateUser = () => {
    setLoader(true);
    if(!fpass) {
      const formdata = new FormData();
      formdata.append("username", cObj.username);
      formdata.append("password", cObj.password);

      apiInstance
        .post("/validateUser", formdata)
        .then(response => {
          setLoader(false);
          setStatus(response.data.response.status);
          // setAuth(response.data.response.status === "Valid user");
          props.validate(response.data.response.status === "Valid user", response.data.response.lastLogin, cObj);
        })
        .catch(error => console.error(error));
    } else {
      const formdata = new FormData();
      formdata.append("currentPass", fObj.currentPass);
      formdata.append("newPass", fObj.newPass);
      formdata.append("repeatPass", fObj.repeatPass);

      apiInstance
        .post("/changePassword", formdata)
        .then(response => {
          setLoader(false);
          setStatus(response.data.response.status);
          // setAuth(response.data.response.status === "Password successfully changed");
          setFpass(false);
          props.validate(false, "", fObj);
          props.ddForgot(false);
        })
        .catch(error => console.error(error));
    }
  };

  useEffect(() => {
    setFpass(props.dForgot);
  }, [props.dForgot]);

  return (
    <div>
      <div className="text-center">
        <i
          className={
            !fpass ? "fi-interface-user user" : "fi-creative-padlock-1 user"
          }
        ></i>
      </div>
      <div className="text-center head">
        {!fpass ? "Sign In" : "Change Password"}
        <div><span className={`label label-${status === "Password successfully changed" ? "success" : "danger"}`}>{status}</span></div>
      </div>
      {!loader ? (
        !fpass ? (
          <SignInForm
            showForgot={bool => {
              setFpass(bool);
              props.showForgot(bool);
              setStatus("")
            }}
            onCredentialUpdate={obj => setCobj(obj)}
            onEnter={bool => bool ? validateUser() : false}
          />
        ) : (
          <ChangePassword onCredentialUpdate={obj => {setFobj(obj)}} />
        )
      ) : (
        <div className="login-loader">
          <Loader
            type={helpers.LoadRandomSpinnerIcon()}
            color={helpers.fluorescentColor}
            height={100}
            width={100}
          />
        </div>
      )}
      <button onClick={() => validateUser()} className="btn btn-bni">
        Submit
      </button>
    </div>
  );
}

export default LoginForm;
