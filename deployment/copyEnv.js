"use strict";
const fs = require("fs");

const srcFile = "./.env.production";
const destFile = "environments.ini";
const dest = "./services/";

fs.copyFile(srcFile, dest + destFile, err => {
  if (err) throw err;
  console.log("👍 ENV added to production");
});
