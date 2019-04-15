import axios from "axios";

axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response.data)
);

const Http = axios.create({
  baseURL: "https://api.exchangeratesapi.io/",
  timeout: 5000,
});

export default Http;