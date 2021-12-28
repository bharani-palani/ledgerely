import React, { useState, useEffect } from "react";
import BackendCore from "../configuration/backend/BackendCore";
import { configArray } from "../configuration/backendTableConfig";
import md5 from "md5";

function Config(props) {
  return <div>Hello Config - {md5("bnisuccess@123")}</div>;
}
export default Config;
