var _require = require("fs"),
  writeFile = _require.writeFile;

var path = require("path");

var packageJson = require(process.cwd() + "/package.json");

var metaJson = path.join(process.cwd(), "build", "meta.json");

var appVersion = packageJson.version;
var jsonData = {
  version: appVersion,
};
var jsonContent = JSON.stringify(jsonData);
writeFile(metaJson, jsonContent, "utf8", function (err) {
  if (err) {
    console.error("An error occurred while writing JSON Object to meta.json");
    throw console.error(err);
  } else {
    console.log("meta.json file has been saved with v" + appVersion);
  }
});
