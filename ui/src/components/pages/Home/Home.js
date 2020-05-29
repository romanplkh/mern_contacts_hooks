import React from "react";
import Contacts from "../../contacts/Contacts";
import ContactForm from "../../contact-form/ContactForm";
import ContactFilter from "../../contact-filter/ContactFilter";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
