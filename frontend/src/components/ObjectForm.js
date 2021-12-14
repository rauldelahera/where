import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import addingObject from "../services/object.service";
import addingObjects from "../services/object.service";

export default function ObjectForm() {
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    };
  
    let objectNameAfterState = inputs.objectName;
    let objectTypeAfterState = inputs.objectType;
    console.log(objectNameAfterState, objectTypeAfterState);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      addingObjects(objectNameAfterState, objectTypeAfterState);
      setInputs({});
    };
    return (
        <div className="form-padding">
        <form onSubmit={handleSubmit}>
          <label htmlFor="objectName">name your object.</label>
          <input
            type="text"
            name="objectName"
            value={inputs.objectName || ""}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
        </div>
      );
    }