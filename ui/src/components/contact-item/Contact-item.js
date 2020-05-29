import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;

  const typeClass = ["badge"];
  if (type === "professional") {
    typeClass.push("badge-success");
  } else {
    typeClass.push("badge-primary");
  }

  const contactCTX = useContext(ContactContext);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span style={{ float: "right" }} className={typeClass.join(" ")}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={contactCTX.selectContact.bind(null, contact)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={contactCTX.deleteContact.bind(null, id)}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
