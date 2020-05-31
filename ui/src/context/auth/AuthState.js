import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import AuthConext from "./AuthContext";
import axios from "axios";
import * as types from "../types";
import { funnelError } from "../../utils/utilsMethods";

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
      console.log(res);

      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      let responseError = funnelError(error);
      dispatch({ type: types.REGISTER_FAIL, payload: responseError });
    }
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
      }}
    >
      {props.children}
    </AuthConext.Provider>
  );
};

export default AuthtSate;
