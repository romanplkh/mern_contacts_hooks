import axios from "axios";

export const setAuthToken = () => {
  const token = getTokenFromStorage();

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

const getTokenFromStorage = () => {
  const tkn = localStorage.getItem("token");
  return tkn ? tkn : null;
};

export const funnelError = (error) => {
  let responseError = null;
  if (error.response.data.exception) {
    responseError = error.response.data.exception;
  }

  if (error.response.data.msg) {
    responseError = error.response.data.msg;
  }

  if (error.response.data.errors) {
    responseError = error.response.data.errors;
  }

  return responseError;
};

export const hideError = (cb, action, timeout) => {
  setTimeout(() => {
    cb(action);
  }, timeout);
};
