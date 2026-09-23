import React, { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { GoogleSignIn } from "@capawesome/capacitor-google-sign-in";
import GoogleSvg from "../../images/charts/svgComponents/GoogleSvg";

let initializationPromise = null;

const initializeGoogle = async () => {
  if (!initializationPromise) {
    initializationPromise = GoogleSignIn.initialize({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scopes: ["profile", "email"],
      redirectUrl: import.meta.env.VITE_DOMAIN_URL,
    }).catch(error => {
      initializationPromise = null;
      throw error;
    });
  }

  return initializationPromise;
};

const isWeb = () => {
  return !window.Capacitor?.isNativePlatform?.();
};

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const callbackHandledRef = useRef(false);

  /**
   * Convert Google ID token into the payload
   * expected by the application.
   */
  const processLoginResult = result => {
    try {
      if (!result?.idToken) {
        console.error("Google login did not return an ID token.");
        onError?.();
        return;
      }
      const decoded = jwtDecode(result.idToken);
      onSuccess?.(decoded);
    } catch (error) {
      console.error("Unable to process Google ID token:", error);
      onError?.();
    }
  };

  /**
   * Handle Google OAuth redirect on Web.
   */
  useEffect(() => {
    if (!isWeb()) {
      return;
    }

    const handleWebRedirect = async () => {
      // Prevent duplicate callback processing.
      if (callbackHandledRef.current) {
        return;
      }

      const url = new URL(window.location.href);

      const hasGoogleCallback =
        url.searchParams.has("code") ||
        url.searchParams.has("error") ||
        url.searchParams.has("state");

      // Normal page load - nothing to process.
      if (!hasGoogleCallback) {
        try {
          await initializeGoogle();
        } catch (error) {
          console.error("Google initialization error:", error);
        }
        return;
      }
      callbackHandledRef.current = true;

      try {
        await initializeGoogle();
        const result = await GoogleSignIn.handleRedirectCallback();
        processLoginResult(result);
        // Remove OAuth parameters from browser URL.
        const cleanUrl = `${window.location.origin}${window.location.pathname}`;
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (error) {
        console.error("Google web redirect callback error:", error);
        onError?.();
        // Also clean the URL after a failed callback.
        const cleanUrl = `${window.location.origin}${window.location.pathname}`;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    };

    handleWebRedirect();
  }, []);

  /**
   * Start Google login.
   */
  const handleLogin = async () => {
    try {
      await initializeGoogle();
      const nonce = crypto.randomUUID();
      const result = await GoogleSignIn.signIn({
        nonce,
      });
      /**
       * Native/mobile normally returns the ID token directly.
       *
       * On web, the browser may redirect instead.
       */
      if (result?.idToken) {
        processLoginResult(result);
      }
    } catch (error) {
      console.error("Google login error:", error);
      onError?.();
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="btn btn-dark py-2 rounded-pill border w-100 d-flex align-items-center justify-content-center gap-2 bg-gradient"
    >
      <GoogleSvg size={25} />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;