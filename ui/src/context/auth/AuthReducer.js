import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

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

const populateLoadedUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
    isAuth: true,
    loading: false,
  };
};

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return setToken(state, action.payload);
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return removeToken(state, action.payload);
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case USER_LOADED:
      return populateLoadedUser(state, action);
    default:
      return state;
  }
};
