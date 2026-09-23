const baseUrl = () => {
  if (import.meta.env.MODE === "capacitor") {
    /**
     * Important: Base URL setup for Capacitor mobile app
     * http://localhost:5173/ledgerely/services is not working after several attempts to work in localhost.
     * Hence declared VITE_MOBILE_APP_BASE_URL in .env file and used it here.
     * Note: https://ledgerely.localhost/ledgerely/services/ is also not working due to certificate issues.
     * This is working fine in both Android and IOS mobile apps.
     */
    return import.meta.env.VITE_MOBILE_APP_BASE_URL;
  }
  return import.meta.env.VITE_BASE_URL;
};

export { baseUrl };
