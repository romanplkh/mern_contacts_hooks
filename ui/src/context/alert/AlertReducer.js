import { SET_ALERT, REMOVE_ALERT } from "../types";

const setAlert = (state, action) => {
  return [...state, action.payload];
};

const removeAlert = (state, action) => {
  let newState = [...state];
  newState = newState.filter((el) => el.id !== action.payload);
  return newState;
};

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return setAlert(state, action);
    case REMOVE_ALERT:
      return removeAlert(state, action);
    default:
      return state;
  }
};
