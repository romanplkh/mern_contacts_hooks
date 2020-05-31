import React, { useState, useEffect, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

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

  const onLogin = (e) => {
    e.preventDefault();

    if (!isEmpty(email) && !isEmpty(password)) {
      authCTX.login({ email, password });
    } else {
      alertCTX.setAlert("All fields are required", "danger");
    }
  };

  return (
    <div className="form-container">
      <h1>
        <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onLogin}>
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
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
