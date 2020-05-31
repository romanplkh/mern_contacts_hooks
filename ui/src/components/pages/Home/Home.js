import React, { useContext, useEffect } from "react";
import Contacts from "../../contacts/Contacts";
import ContactForm from "../../contact-form/ContactForm";
import ContactFilter from "../../contact-filter/ContactFilter";
import AuthContext from "../../../context/auth/AuthContext";

const Home = (props) => {
  const authCTX = useContext(AuthContext);

  useEffect(() => {
    if (!authCTX.isAuth) {
      props.history.replace("/login");
    }

    authCTX.loadUser();

    //eslint-disable-next-line
  }, [authCTX.isAuth]);

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
