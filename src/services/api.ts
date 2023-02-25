import { redirect } from "react-router-dom";
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9999',
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})

export default api
