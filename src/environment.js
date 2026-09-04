const baseUrl = () => {
  if (import.meta.env.MODE === "capacitor") {
    return "https://ledgerely.com/dev/services";
  }
  return import.meta.env.VITE_BASE_URL;
};

export { baseUrl };
