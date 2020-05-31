import React, { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Alerts from "./components/layout/Alerts/Alerts";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import ContactSate from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import { setAuthToken } from "./utils/utilsMethods";

function App() {
  useEffect(() => {
    setAuthToken();
  }, []);

  return (
    <AuthState>
      <ContactSate>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navbar title="Contact Manager" icon="fas fa-id-card-alt" />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </ContactSate>
    </AuthState>
  );
}

export default App;
