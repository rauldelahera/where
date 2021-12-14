import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service";
import axios from "axios";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { useForm } from "react-hook-form";
import addingObject from "../services/object.service";
import "../formstyle.css";


const ObjectPage = () => {
  const user = AuthService.getCurrentUser();

//   const createUser = (string) => {
//     return axios({
//         method: 'post',
//         url: "http://localhost:8080/api/object/add",
//         data: {
//           string
//         },
//         headers: {
//           'Authorization': `Bearer ${user.accessToken}`
//         },
//     })
// };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    createUser(data);
  ;
  };


  // const intialValues = {
  //   objectName: "",
  //   objectType: "",
  //   userName: `${user.username}`
  // };

  return (
    <div className="map">
      <div className="see-form">

    </div>
    </div>
  );
};

export default ObjectPage;