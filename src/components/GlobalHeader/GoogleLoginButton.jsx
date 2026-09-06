import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Capacitor } from "@capacitor/core";
import { jwtDecode } from "jwt-decode";
import GoogleSvg from "../../images/charts/svgComponents/GoogleSvg";
import { GoogleSignIn } from "@capawesome/capacitor-google-sign-in";

const isNative = Capacitor.isNativePlatform();

let initializationPromise;

const initialize = () => {
  if (!initializationPromise) {
    initializationPromise = GoogleSignIn.initialize({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
      // redirectUrl: "http://localhost:5001/dev/dashboard",
    });
  }

  return initializationPromise;
};

const GoogleLoginButton = props => {
  const { onSuccess, onError } = props;

  useEffect(() => {
    if (isNative) {
      initialize();
    }
  }, []);

  const handleNativeLogin = async () => {
    try {
      await initialize();
      const nonce = Math.random().toString(36).substring(2, 15);
      const result = await GoogleSignIn.signIn({ nonce });
      if (result && result.idToken) {
        const decoded = jwtDecode(result.idToken);
        onSuccess(decoded);
      }
    } catch (error) {
      console.error("Native Google login error:", error);
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
};

export default GoogleLoginButton;
