import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import ContactSate from "./context/contact/ContactState";

function App() {
  return (
    <ContactSate>
      <BrowserRouter>
        <Fragment>
          <Navbar title="Contact Manager" icon="fas fa-id-card-alt" />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    </ContactSate>
  );
}

export default App;
