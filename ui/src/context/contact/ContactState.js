import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import * as types from "../types";

const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "email@email.com",
    phone: "506-962-2222",
    type: "personal",
  },
  {
    id: 2,
    name: "Sam Smith",
    email: "sam@yahoo.com",
    phone: "506-962-7777",
    type: "professional",
  },
  {
    id: 3,
    name: "Rachel Salinson",
    email: "rachel@hotmail.com",
    phone: "506-962-1515",
    type: "personal",
  },
];

const ContactSate = (props) => {
  const initialState = {
    contacts: mockContacts,
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Actions
  const addContact = (contact) => {
    contact.id = state.contacts.length + 1;
    dispatch({ type: types.ADD_CONTACT, payload: contact });
  };

  const deleteContact = (id) => {
    dispatch({ type: types.DELETE_CONTACT, payload: id });
  };

  const selectContact = (contact) => {
    dispatch({ type: types.SET_CURRENT, payload: contact });
  };

  const clearSelected = () => {
    dispatch({ type: types.CLEAR_CURRENT, payload: null });
  };

  const updateContact = (contact) => {
    dispatch({ type: types.UPDATE_CONTACT, payload: contact });
  };

  const filterContacts = (text) => {
    dispatch({ type: types.FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: types.CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        selectContact,
        clearSelected,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactSate;
