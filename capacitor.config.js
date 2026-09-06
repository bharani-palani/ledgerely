import { loadEnv } from "vite";

const env = loadEnv("capacitor", process.cwd(), "VITE_");

const appId = "com.ledgerely.app";
const appName = "Ledgerely";
const webDir = "build";
const plugins = {
  GoogleAuth: {
    scopes: ["profile", "email"],
    iosClientId: env.VITE_GOOGLE_IOS_CLIENT,
    androidClientId: env.VITE_GOOGLE_ANDROID_CLIENT,
    serverClientId: env.VITE_GOOGLE_CLIENT_ID,
    forceCodeForRefreshToken: true,
  },
};

const config = {
  appId,
  appName,
  webDir,
  plugins,
};

export { appId, appName, webDir, plugins };
export default config;
