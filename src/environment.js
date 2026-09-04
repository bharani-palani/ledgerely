const baseUrl = () => {
  if (import.meta.env.MODE === "capacitor") {
    /**
     * Base URL for Capacitor mobile app to be changed to /app/services when deployed to production
     * http://localhost:5001/ledgerely/services is not working after several attempts to work in localhost.
     */
    return "https://ledgerely.com/app/services";
  }
  return import.meta.env.VITE_BASE_URL;
};

export { baseUrl };
