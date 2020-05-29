import React, { useRef, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
  const searchField = useRef();
  const contactCTX = useContext(ContactContext);

  const { clearFilter, filterContacts, filtered } = contactCTX;

  //RESET TEXT INSIDE INPUT WHEN WE DO NOT FILTER ITEMS
  useEffect(() => {
    if (filtered === null) {
      searchField.current.value = "";
    }
  });

  const onInputChange = (e) => {
    let searchText = searchField.current.value;
    if (searchText.trim() !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={searchField}
        type="text"
        placeholder="Search Contacts"
        onChange={onInputChange}
      />
    </form>
  );
};

export default ContactFilter;
