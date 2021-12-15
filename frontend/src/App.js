import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import ObjectPage from "./components/ObjectPage";
import Objects from "./components/Objects";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div className="after-footer">
      <Navbar/>
        {/* <AuthVerify logOut={logOut}/> */}
      </div>
      <Footer />
    </>
  );
};

export default App;
