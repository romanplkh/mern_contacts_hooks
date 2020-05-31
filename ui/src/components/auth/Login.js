import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onImputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onLogin = (e) => {
    e.pereventDefault();
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
