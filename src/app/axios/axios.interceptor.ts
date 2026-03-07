import axios from "axios";

import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.url?.includes("/login") ||
      config.url?.includes("/auth/refreshAccessToken")
    ) {
      return config;
    }
    if (!window.navigator.onLine) {
      toast.error("No Internet Connection", { position: "bottom-right" });
    }
    if (!config.headers) {
      config.headers = new axios.AxiosHeaders();
    }
    if (config?.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let queue: any[] = [];

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refreshAccessToken");
        queue.forEach(cb => cb());
        queue = [];
        console.log('refresing access token done')
        return axiosInstance(originalRequest);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);