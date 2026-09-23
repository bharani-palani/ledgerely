import React, { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { AppleSignIn, SignInScope } from "@capawesome/capacitor-apple-sign-in";

const APPLE_SERVICE_ID = import.meta.env.VITE_APPLE_SERVICE_ID;
const APPLE_REDIRECT_URL = import.meta.env.VITE_APPLE_REDIRECT_URL;

const AppleLoginButton = ({ onSuccess, onError, disabled }) => {
  const platform = Capacitor.getPlatform();
  const requiresInitialization = platform === "android" || platform === "web";

  useEffect(() => {
    if (requiresInitialization) {
      AppleSignIn.initialize({ clientId: APPLE_SERVICE_ID }).catch(error => {
        console.error("Apple Sign In initialization error:", error);
      });
    }
  }, [requiresInitialization]);

  const handleAppleLogin = async () => {
    try {
      if (requiresInitialization) {
        await AppleSignIn.initialize({ clientId: APPLE_SERVICE_ID });
      }

      const nonce = Math.random().toString(36).substring(2, 15);
      const state = Math.random().toString(36).substring(2, 15);
      const result = await AppleSignIn.signIn({
        scopes: [SignInScope.Email, SignInScope.FullName],
        nonce,
        state,
        ...(requiresInitialization ? { redirectUrl: APPLE_REDIRECT_URL } : {}),
      });
      if (!result?.idToken) {
        onError?.();
        return;
      }

      onSuccess?.({ ...result, nonce });
    } catch (error) {
      if(error.error === "popup_closed_by_user") {
        return;
      }
      console.error("Apple Sign In error:", error);
      onError?.(error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleAppleLogin}
      className='btn btn-dark py-2 rounded-pill border w-100 d-flex align-items-center justify-content-center gap-2 bg-gradient'
      disabled={disabled}
    >
      <i className='fa fa-apple fa-lg' aria-hidden='true' />
      <span>Sign in with Apple</span>
    </button>
  );
};

export default AppleLoginButton;
