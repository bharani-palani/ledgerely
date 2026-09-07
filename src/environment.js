const baseUrl = () => {
  if (import.meta.env.MODE === "capacitor") {
    /**
     * Important: Base URL setup for Capacitor mobile app
     * http://localhost:5001/ledgerely/services is not working after several attempts to work in localhost.
     * Hence declared VITE_MOBILE_APP_BASE_URL in .env file and used it here.
     * This is working fine in both Android and IOS mobile apps.
     */
    return import.meta.env.VITE_MOBILE_APP_BASE_URL;
  }
  return import.meta.env.VITE_BASE_URL;
};

export { baseUrl };
