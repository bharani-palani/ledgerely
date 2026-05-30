const { override, addWebpackPlugin } = require("customize-cra");
const { InjectManifest } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = override(
  addWebpackPlugin(
    new InjectManifest({
      swSrc: path.resolve(__dirname, "public/custom-sw.js"),
      swDest: "service-worker.js",
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
    }),
  ),
);
