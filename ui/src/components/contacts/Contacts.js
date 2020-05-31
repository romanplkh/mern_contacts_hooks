import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "../contact-item/Contact-item";

const Contacts = () => {
  //Access to slice of state with contacts
  const contactCTX = useContext(ContactContext);

  const { contacts, filtered } = contactCTX;

  if (contacts && contacts.length === 0) {
    return <h4>Please add a contact...</h4>;
  }

  let contx = filtered !== null ? filtered : contacts;

  return (
    <Fragment>
      {contx.length > 0 ? (
        contx.map((c) => <ContactItem key={c.id} contact={c} />)
      ) : (
        <h3>No contacts found</h3>
      )}
    </Fragment>
  );
};

export default Contacts;
