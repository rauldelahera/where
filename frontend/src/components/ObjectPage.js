import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service";
import axios from "axios";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { useForm } from "react-hook-form";
import addingObject from "../services/object.service";
import "../formstyle.css";
import ObjectForm from "./ObjectForm";


const ObjectPage = () => {
  const user = AuthService.getCurrentUser();

  return (
    <div className="map">
    <div className="see-form">
    <ObjectForm/>
    </div>
    </div>
  );
};

export default ObjectPage;