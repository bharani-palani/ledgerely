import React, { useState, useEffect } from "react";
import BackendCore from "../configuration/backend/BackendCore";
import { configArray } from "../configuration/backendTableConfig";
import ReactiveForm from "./ReactiveForm";

function Config(props) {
  const formStructure = [
    {
      id: 1,
      index: "userName",
      label: "User Name",
      elementType: "text",
      value: "",
      placeHolder: "JohnDoe",
      className: "form-control",
      options: {
        validation: /^[a-zA-Z0-9]{4,10}$/g,
        help: "Minimum 4, maximum 10 with no special characters",
      },
    },
    {
      id: 2,
      index: "userPassword",
      label: "Password",
      elementType: "password",
      value: "",
      placeHolder: "Welcome@123",
      className: "form-control",
      options: {
        validation:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        help:
          "Minimum length 8 with atleast 1 capital, 1 special (!@#$%^&*) and 1 numeric character",
      },
    },
    {
      id: 3,
      index: "userMobile",
      label: "Mobile",
      elementType: "number",
      value: "",
      placeHolder: "9XXXXXXXXX",
      className: "form-control",
      options: { validation: /^[0-9]{10}$/ },
    },
    {
      id: 4,
      index: "userEmail",
      label: "Email",
      elementType: "text",
      value: "",
      placeHolder: "John@Doe.com",
      className: "form-control",
      options: {
        validation:
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      },
    },
  ];
  const [payload, setPayload] = useState({ userName: "", userMobile: "" });
  const massagePayload = (index, value) => {
    const bPayload = { ...payload, [index]: value };
    setPayload(bPayload);
  };
  return (
    <div>
      <ReactiveForm
        className="reactive-form"
        structure={formStructure}
        onChange={(index, value) => massagePayload(index, value)}
      />
      <h4>Output</h4>
      {JSON.stringify(payload)}
    </div>
  );
}
export default Config;
