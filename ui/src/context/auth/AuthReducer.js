import { REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_ERRORS } from "../types";

const setToken = (state, token) => {
  localStorage.setItem("token", token);

  return {
    ...state,
    token,
    isAuth: true,
    loading: false,
  };
};

const removeToken = (state, error) => {
  localStorage.removeItem("token");

  return {
    ...state,
    error,
    loading: false,
    isAuth: false,
    user: null,
  };
};

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return setToken(state, action.payload);
    case REGISTER_FAIL:
      return removeToken(state, action.payload);
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
