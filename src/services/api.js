import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useAxiosWithJWTInterceptor = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null,
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token") || null,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [, setRefreshQueue] = useState([]);

  // Base axios instance
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    instance.interceptors.request.use(
      config => {
        if (accessToken && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Response interceptor to handle token refresh
    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        // If 401 and not a refresh request and not already retried
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/auth/refresh")
        ) {
          originalRequest._retry = true;

          try {
            if (!isRefreshing) {
              setIsRefreshing(true);

              // Refresh the token
              const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
                { refreshToken },
              );

              const newAccessToken = response.data.accessToken;
              const newRefreshToken = response.data.refreshToken;

              // Update tokens in state and localStorage
              setAccessToken(newAccessToken);
              setRefreshToken(newRefreshToken);
              localStorage.setItem("access_token", newAccessToken);
              localStorage.setItem("refresh_token", newRefreshToken);

              // Process queued requests
              processQueue(null, newAccessToken);

              // Retry original request
              originalRequest.headers["Authorization"] =
                `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            } else {
              // If already refreshing, add to queue
              return new Promise((resolve, reject) => {
                addToQueue({ resolve, reject, config: originalRequest });
              });
            }
          } catch (refreshError) {
            // Refresh failed - clear tokens and redirect to login
            processQueue(refreshError, null);
            clearTokens();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          } finally {
            setIsRefreshing(false);
          }
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }, [accessToken, refreshToken, isRefreshing]);

  // Queue management functions
  const addToQueue = request => {
    setRefreshQueue(prevQueue => [...prevQueue, request]);
  };

  const processQueue = (error, token = null) => {
    setRefreshQueue(prevQueue => {
      prevQueue.forEach(prom => {
        if (error) {
          prom.reject(error);
        } else {
          prom.config.headers["Authorization"] = `Bearer ${token}`;
          prom.resolve(axiosInstance(prom.config));
        }
      });
      return [];
    });
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear any pending requests in queue
      processQueue(new Error("Component unmounted"));
    };
  }, []);

  return { axiosInstance, clearTokens };
};

export default useAxiosWithJWTInterceptor;
