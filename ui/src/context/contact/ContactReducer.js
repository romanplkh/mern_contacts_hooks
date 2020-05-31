import * as types from "../types";

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const filterArrayHandler = (conts, payload, filterValue) => {
  return conts.filter((c) => c[filterValue] !== payload);
};

const addContact = (state, action) => {
  return updateObject(state, { contacts: [...state.contacts, action.payload] });
};

const updateContact = (state, action) => {
  let updatedCt = [...state.contacts];
  let ctToUpdateIdx = updatedCt.findIndex((c) => c.id === action.payload.id);
  updatedCt.splice(ctToUpdateIdx, 1, action.payload);
  return updateObject(state, { contacts: updatedCt });
};

const deleteContacts = (state, action) => {
  let newContacts = [...state.contacts];
  let newFiltered = [...state.filtered];
  newContacts = filterArrayHandler(newContacts, action.payload, "id");
  newFiltered = filterArrayHandler(newFiltered, action.payload, "id");

  return updateObject(state, {
    contacts: newContacts,
    filtered: newFiltered,
    current: null,
  });
};

const updateCurrent = (state, action) => {
  return updateObject(state, { current: action.payload });
};

const filterContacts = (state, action) => {
  let newContacts = [...state.contacts];

  if (newContacts.length > 0) {
    newContacts = newContacts.filter((ct) => {
      return (
        ct.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        ct.email.toLowerCase().includes(action.payload.toLowerCase())
      );
    });
    return updateObject(state, { filtered: newContacts });
  }

  return state;
};

const clearFilter = (state, action) => {
  return updateObject(state, { filtered: null });
};

export default (state, action) => {
  switch (action.type) {
    case types.ADD_CONTACT:
      return addContact(state, action);
    case types.UPDATE_CONTACT:
      return updateContact(state, action);
    case types.DELETE_CONTACT:
      return deleteContacts(state, action);
    case types.FILTER_CONTACTS:
      return filterContacts(state, action);
    case types.SET_CURRENT:
    case types.CLEAR_CURRENT:
      return updateCurrent(state, action);
    case types.CLEAR_FILTER:
      return clearFilter(state, action);
    default:
      return state;
  }
};
