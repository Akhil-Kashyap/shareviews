import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Route exact path="/" component={Landing}></Route>
        <div className="contatiner">
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
