"use strict";
const fs = require("fs");

const srcFile = "./.env.production";
const destFile = ".env.production";
const dest = "./services/";

fs.copyFile(srcFile, dest + destFile, err => {
  if (err) throw err;
  console.log("👍 ENV added to production");
});
