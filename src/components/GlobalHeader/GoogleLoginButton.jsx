import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import GoogleSvg from "../../images/charts/svgComponents/GoogleSvg";
import { GoogleSignIn } from "@capawesome/capacitor-google-sign-in";

let initializationPromise;

const initialize = () => {
  if (!initializationPromise) {
    initializationPromise = GoogleSignIn.initialize({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
      redirectUrl: import.meta.env.VITE_DOMAIN_URL,
    });
  }

  return initializationPromise;
};

const GoogleLoginButton = props => {
  const { onSuccess, onError } = props;

  useEffect(() => {
    initialize();
  }, []);

  const handleLogin = async () => {
    try {
      await initialize();
      const nonce = Math.random().toString(36).substring(2, 15);
      const result = await GoogleSignIn.signIn({ nonce });
      if (result && result.idToken) {
        const decoded = jwtDecode(result.idToken);
        onSuccess(decoded);
      }
    } catch (error) {
      console.error("Google login error:", error);
      onError();
    }
  };

  return (
    <button
      type='button'
      onClick={handleLogin}
      className='btn btn-dark py-2 rounded-pill border w-100 d-flex align-items-center justify-content-center gap-2 bg-gradient'
    >
      <GoogleSvg size={25} />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
