import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import addingObject from "../services/object.service";

export default function ObjectForm() {
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    };
  
    let titleAfterState = inputs.title;
    let lngAfterState = parseFloat(inputs.lng);
    let latAfterState = parseFloat(inputs.lat);
    console.log(titleAfterState, lngAfterState, latAfterState);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      addingLocation(titleAfterState, latAfterState, lngAfterState);
      setInputs({});
    };
    return (
        <div className="form-padding">
        <form onSubmit={handleSubmit}>
          <label htmlFor="objectName">name your object.</label>
          <input
            type="text"
            name="objectName"
            value={inputs.lng || ""}
            onChange={handleChange}
          />
          <input
            defaultValue={intialValues.userName}
            type="hidden"
            {...register("username")}
          />
          <label>type of object.</label>
          <select {...register("objectType")}>
            <option value="car">car.</option>
            <option value="bike">bike.</option>
            <option value="tent">tent.</option>
            <option value="other">other.</option>
          </select>

          <input type="submit" />
        </form>
    
          <div className="marks">
            <ul>
              <li>
                {" "}
                <h5>First Mark:</h5>
              </li>
              <li>
                <h5>Second Mark:</h5>
              </li>
              <li>
                <h5>Third Mark:</h5>
              </li>
              <li>
                <h5>Fourth Mark:</h5>
              </li>
              <li>
                <h5>Fift Mark:</h5>
              </li>
            </ul>
          </div>
        </div>
      );
    }