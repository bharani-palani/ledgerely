import React, { useEffect, useRef } from "react";
import { GoogleSignIn, ErrorCode } from "@capawesome/capacitor-google-sign-in";
import GoogleSvg from "../../images/charts/svgComponents/GoogleSvg";
import { FormattedMessage } from "react-intl";

let initializationPromise = null;

const initializeGoogle = async () => {
  if (!initializationPromise) {
    initializationPromise = GoogleSignIn.initialize({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scopes: ["openid", "email", "profile", "https://www.googleapis.com/auth/userinfo.profile"],
      redirectUrl: import.meta.env.VITE_DOMAIN_URL,
    }).catch(error => {
      initializationPromise = null;
      throw error;
    });
  }

  return initializationPromise;
};

const isNative = () => {
  return Boolean(window.Capacitor?.isNativePlatform?.());
};

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const redirectHandledRef = useRef(false);

  /**
   * Process Google ID token.
   */
  const processIdToken = idToken => {
    try {
      if (!idToken) {
        console.error("Google ID token is missing.");
        onError?.();
        return;
      }
      onSuccess?.(idToken);
    } catch (error) {
      console.error("Google ID token decode failed:", error);
      onError?.();
    }
  };

  /**
   * Handle Google Web OAuth redirect.
   *
   * Your actual Google callback URL looks like:
   *
   * https://ledgerely.com/dev/#state=...&id_token=...&access_token=...
   *
   * Therefore we must read window.location.hash.
   */
  useEffect(() => {
    if (isNative()) {
      return;
    }

    if (redirectHandledRef.current) {
      return;
    }

    const handleWebRedirect = async () => {
      const hash = window.location.hash;

      // Normal page load - no Google response.
      if (!hash || hash.length <= 1) {
        try {
          await initializeGoogle();
        } catch (error) {
          console.error("Google initialization error:", error);
        }

        return;
      }

      const hashParams = new URLSearchParams(hash.substring(1));

      const idToken = hashParams.get("id_token");
      const accessToken = hashParams.get("access_token");
      const state = hashParams.get("state");
      const error = hashParams.get("error");

      // Not a Google OAuth callback.
      if (!idToken && !error) {
        return;
      }

      redirectHandledRef.current = true;

      try {
        if (error) {
          console.error("Google OAuth error:", error, hashParams.get("error_description"));

          onError?.();
          return;
        }

        if (!idToken) {
          console.error("Google OAuth callback did not contain id_token.");
          onError?.();
          return;
        }

        console.log("Google OAuth state:", state);
        console.log("Google OAuth access token received:", !!accessToken);

        processIdToken(idToken);
      } catch (error) {
        console.error("Google web login error:", error);
        onError?.();
      } finally {
        /**
         * Remove OAuth tokens from the browser URL.
         *
         * This changes:
         *
         * https://ledgerely.com/dev/#state=...&id_token=...
         *
         * into:
         *
         * https://ledgerely.com/dev/
         */
        window.history.replaceState({}, document.title, window.location.pathname);
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
       * Native/mobile:
       * GoogleSignIn.signIn() normally returns the ID token directly.
       */
      if (result?.idToken) {
        processIdToken(result.idToken);
      }
    } catch (error) {
      if (error?.code === ErrorCode.SignInCanceled) {
        return;
      }
      console.error("Google login error:", error);
      onError?.();
    }
  };

  return (
    <button
      type='button'
      onClick={handleLogin}
      className='btn btn-light text-dark py-3 border border-1 rounded-3 w-100 d-flex align-items-center justify-content-center gap-2 glassBtn glassBtnLight'
    >
      <GoogleSvg size={25} />
      <span>
        <FormattedMessage id='signInWithGoogle' defaultMessage='Sign in with Google' />
      </span>
    </button>
  );
};

export default GoogleLoginButton;
