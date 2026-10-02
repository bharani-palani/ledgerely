const baseUrl = () => {
  if (import.meta.env.MODE === "capacitor") {
    /**
     * Important: Base URL setup for Capacitor mobile app
     * 1. http://localhost:5173/ledgerely/services is not working after several attempts to work in localhost.
     * Hence declared VITE_MOBILE_APP_BASE_URL in .env file and used it here.
     * 2. Note: https://ledgerely.localhost/ledgerely/services/ is also not working due to certificate issues.
     * 3. "https://ledgerely.com/dev/services" or "https://ledgerely.com/app/services"
     * This is working fine in both Android and IOS mobile apps.
     */
    /**
     * todo: Update this base URL during deployment automation for mobile apps.
     * Ex: return import.meta.env.VITE_MOBILE_APP_BASE_URL;
     */
    return "https://ledgerely.com/app/services";
    // return import.meta.env.VITE_MOBILE_APP_BASE_URL;
  }
  return import.meta.env.VITE_BASE_URL;
};

export { baseUrl };
