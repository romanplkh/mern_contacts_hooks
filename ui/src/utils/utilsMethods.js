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
