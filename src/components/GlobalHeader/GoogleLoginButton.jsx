import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Capacitor } from "@capacitor/core";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { jwtDecode } from "jwt-decode";
import GoogleSvg from "../../images/charts/svgComponents/GoogleSvg";

const isNative = Capacitor.isNativePlatform();
function GoogleLoginButton(props) {
  const { onSuccess, onError } = props;
  const handleNativeLogin = async () => {
    try {
      const platform = Capacitor.getPlatform();
      const clientId = platform === "ios" ? import.meta.env.VITE_GOOGLE_IOS_CLIENT : import.meta.env.VITE_GOOGLE_ANDROID_CLIENT;

      if (!clientId) {
        throw new Error(`Missing Google client ID for ${platform}`);
      }

      await GoogleAuth.initialize({
        clientId,
        scopes: ["profile", "email"],
        serverClientId: import.meta.env.VITE_GOOGLE_SERVER_CLIENT || import.meta.env.VITE_GOOGLE_CLIENT_ID,
        forceCodeForRefreshToken: true,
      });
      const user = await GoogleAuth.signIn();
      const idToken = user.authentication?.idToken;
      if (!idToken) {
        throw new Error("Google ID token not received");
      }
      const decoded = jwtDecode(idToken);
      onSuccess(decoded);
    } catch (error) {
      console.error("Native Google login error:", error);
      onError();
    }
  };

  if (isNative) {
    return (
      <button
        type='button'
        onClick={handleNativeLogin}
        className='btn btn-light w-100 border border-1 d-flex align-items-center justify-content-center gap-2'
      >
        <GoogleSvg size={25} />
        <span>Sign in with Google</span>
      </button>
    );
  }

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        if (!credentialResponse.credential) {
          onError();
          return;
        }
        const decoded = jwtDecode(credentialResponse.credential);
        onSuccess(decoded);
      }}
      onError={() => {
        onError();
      }}
    />
  );
}

export default GoogleLoginButton;
