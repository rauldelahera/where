import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import "./Objects.css";
import { useForm } from "react-hook-form";
import addingObject from "../services/object.service";
import "../formstyle.css";
import ObjectForm from "./ObjectForm";
import queryDVLA from "../services/dvla-service";


const ObjectPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();  
  
  const [objects, setObjects] = useState();
  const [storeObject, setObject] = useState();
  
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/object/${currentUser.username}/get`,
        {
          headers: authHeader(),
        }
      );
      setObjects(result.data);
    };
    fetchData();
  }, []);

  // const conditData = (object) => {
  //   return(
  //     <div>
  //       {object.make}
  //       {object.colour}
  //       {object.registrationNumber}
  //       {object.co2Emissions}
  //       {object.taxDueDate}
  //       {object.motExpiryDate}
  //     </div>
  //   )
  // }

  return (
    <ObjectForm/>
  );
};

export default ObjectPage;