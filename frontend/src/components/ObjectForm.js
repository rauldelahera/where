import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import addingObjects from "../services/object.service";

import "../formstyle.css";

export default function ObjectForm() {
    const { register, handleSubmit, setValue } = useForm();
    
    const onSubmit = (data) => {
        let objectName = data.objectName;
        console.log(objectName);
        let objectType = data.objectType;
        console.log(objectType);
      addingObjects(objectName, objectType);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="objectName">object name.</label>
        <input placeholder="Enter a memorable name" {...register("objectName")} />
  
        <label>object type.</label>
        <select {...register("objectType")}>
          <option value="car">car.</option>
          <option value="bike">bike.</option>
          <option value="tent">tent.</option>
          <option value="other">other.</option>
        </select>
  
        <input type="submit" />
      </form>
      );
    }