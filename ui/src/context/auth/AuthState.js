import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import AuthConext from "./AuthContext";
import axios from "axios";
import * as types from "../types";
import { funnelError, setAuthToken } from "../../utils/utilsMethods";

const BASE_URL = "http://localhost:5000";

const AuthtSate = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuth: null,
    loading: true,
    error: null,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Actions

  const register = async (data) => {
    clearErrors();
    try {
      const res = await axios.post(`${BASE_URL}/api/users`, data, config);
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.token });
      loadUser();
    } catch (error) {
      let responseError = funnelError(error);
      dispatch({ type: types.REGISTER_FAIL, payload: responseError });
    }
  };

  const loadUser = async () => {
    //load token into global headers
    setAuthToken();
    try {
      const res = await axios.get("/api/auth");

      dispatch({ type: types.USER_LOADED, payload: res.data.payload });
    } catch (error) {
      let responseError = funnelError(error);
      dispatch({ type: types.AUTH_ERROR, payload: responseError });
    }
  };

  const login = async (data) => {
    clearErrors();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth`, data, config);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.token });
      loadUser();
    } catch (error) {
      let responseError = funnelError(error);
      dispatch({ type: types.LOGIN_FAIL, payload: responseError });
    }
  };

  const logout = () => {
    dispatch({ type: types.LOGOUT });
  };

  const clearErrors = () => {
    dispatch({ type: types.CLEAR_ERRORS });
  };
  return (
    <AuthConext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuth: state.isAuth,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthConext.Provider>
  );
};

export default AuthtSate;
