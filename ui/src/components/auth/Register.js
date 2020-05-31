import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, name, password, confirmPassword } = user;

  const alertCTX = useContext(AlertContext);
  const authCTX = useContext(AuthContext);

  useEffect(() => {
    if (authCTX.isAuth) {
      props.history.replace("/");
    }

    if (authCTX.error != null) {
      alertCTX.setAlert(authCTX.error, "danger");
    }
    //eslint-disable-next-line
  }, [authCTX.error, authCTX.isAuth, props.history]);

  const onImputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isEmpty = (el) => {
    return el === "";
  };

  const isRequiredLength = (value) => {
    return value.length >= 6;
  };

  const arePasswordsMatch = (p1, p2) => {
    return p1 === p2;
  };

  const onRegister = (e) => {
    let isValid = true;
    //Validate input fields UI
    e.preventDefault();
    for (let field in user) {
      if (isEmpty(user[field])) {
        isValid = false;
        alertCTX.setAlert(
          field.charAt(0).toUpperCase() + field.slice(1) + " is required",
          "danger"
        );
      }
    }

    if (!arePasswordsMatch(password, confirmPassword)) {
      alertCTX.setAlert("Passwords do not match", "danger");
      isValid = false;
    } else if (!isRequiredLength(password)) {
      alertCTX.setAlert("Password should be at least 6 characters", "danger");
      isValid = false;
    }

    if (isValid) {
      //Submit
      const { confirmPassword, ...formData } = user;
      authCTX.register(formData);
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onRegister}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onImputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onImputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onImputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onImputChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
