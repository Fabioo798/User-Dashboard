import axios from "axios";
import { store } from "../store/store";


const apiClient = axios.create({ baseURL: 'http://127.0.0.1:4900/users' }); // Fixed the URL format

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
