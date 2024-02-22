import axios from "axios";
import { getHost } from "./env";

const API = axios.create({
  baseURL: getHost() + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/api/auth/signin";
    }

    return Promise.reject(error);
  }
);

export default API;
