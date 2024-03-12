// api.js
import axios from "axios";

// intances
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  withCredentials: true,
});

// interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      handle403Error();
    }
    return Promise.reject(error);
  }
);

const handle403Error = () => {
  console.log('user redirect.')
  instance.post("/authentication/logout");
  window.location.href = '/sign-in';
};

export default instance;