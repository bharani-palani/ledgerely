const fs = require("fs");
const path = require("path");

// Define the subdirectory dynamically
const subdirectory = process.env.REACT_APP_SUBFOLDER
  ? `/${process.env.REACT_APP_SUBFOLDER}`
  : "/";

const packagePath = path.resolve(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

packageJson.homepage = subdirectory;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log(`Homepage set to: ${packageJson.homepage}`);
