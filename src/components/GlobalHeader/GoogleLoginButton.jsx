import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Capacitor } from "@capacitor/core";
import { jwtDecode } from "jwt-decode";
import GoogleSvg from "../../images/charts/svgComponents/GoogleSvg";

const isNative = Capacitor.isNativePlatform();
function GoogleLoginButton(props) {
  const { onSuccess, onError } = props;
  const handleNativeLogin = async () => {
    try {
      // todo
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
