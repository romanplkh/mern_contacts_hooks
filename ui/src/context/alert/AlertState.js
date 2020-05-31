import React, { useReducer } from "react";
import { v4 } from "uuid";
import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";
import * as types from "../types";
import { hideError } from "../../utils/utilsMethods";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Actions
  const setAlert = (message, type, timeout = 3500) => {
    let idMock = v4();
    if (Array.isArray(message)) {
      message.forEach((err) => {
        idMock = v4();
        dispatch({
          type: types.SET_ALERT,
          payload: { id: idMock, message: err.msg, type },
        });

        hideError(
          dispatch,
          { type: types.REMOVE_ALERT, payload: idMock },
          timeout
        );
      });
    } else {
      dispatch({
        type: types.SET_ALERT,
        payload: { id: idMock, message, type },
      });
      //Make alert dissapear();
      hideError(
        dispatch,
        { type: types.REMOVE_ALERT, payload: idMock },
        timeout
      );
    }
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
