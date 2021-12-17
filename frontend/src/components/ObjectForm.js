import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import addingObjects from "../services/object.service";
import happyface from "../static/happyface.svg";
import sadface from "../static/sadface.svg";

import "../formstyle.css";
import { object } from "yup";

export default function ObjectForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [objType, setObjType] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [steve, setSteve] = useState([]);

  const currentUser = AuthService.getCurrentUser();

  const onSubmit = (e) => {
    let objectName = e.objectName;
    console.log(objectName);
    let objectType = e.objectType;
    console.log(objectType);
    let registrationNumber = e.licencePlate;
    addingObjects(objectName, objectType, registrationNumber).then(
      (objectName) => {
        setRefreshKey((oldKey) => oldKey + 1);
      }
    );
    return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/object/${currentUser.username}/get`,
        {
          headers: authHeader(),
        }
      );
      let response = result.data;
      setSteve(result.data);
      console.log(steve);
    };
    fetchData();
  }, [refreshKey]);

  const onChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setObjType((objType) => ({ objType, value }));
  };

  const LicencePlate = (objType) => {
    const [render, setConditionalRender] = useState("");
    try {
      if (objType.value === "car") {
        return (
          <input
            name="licenseplate"
            class="licenseplate"
            placeholder="AB 1234"
            {...register("licencePlate")}
          ></input>
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const ShowLicencePlate = (steve) => {
    {
      steve.map((item) => (
        <ul>
          <li>
            <h4>{item.objectName}</h4>
            <h5>{item.objType}</h5>
            <h6>{item.registrationNumber}</h6>
            <h6>{item.co2Emissions}</h6>
            <h6>{item.motExpiryDate}</h6>
            <h6>{item.taxDueDate}</h6>
          </li>
        </ul>
      ));
    }
  };

  return (
    <div className="map">
      <div className="see-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="objectName">OBJECT NAME</label>
          <input
            placeholder="Enter a memorable name"
            {...register("objectName")}
            required
          />

          <label>OBJECT TYPE</label>
          <select
            required
            {...register("objectType")}
            onChange={onChange}
            className="select-object"
          >
            <option value=""> select an option</option>
            <option value="car">car</option>
            <option value="bike">bike</option>
            <option value="tent">tent</option>
            <option value="other">other</option>
          </select>
          {LicencePlate(objType)}
          <input type="submit" className="obj-button" />
        </form>
      </div>
      <div className="see-map">
        {steve.map((item) => (
          <ul>
            <li>
              <h4 className="the-tuff-mate">{item.objectName}</h4>
              <h5>{item.objType}</h5>
              {item.registrationNumber != null ? (
                <div className="sad-face-main">
                  <h6>reg no: {item.registrationNumber}</h6>
                  <h6 className="sad-face-1">
                    co2 emissions: {item.co2Emissions}
                    {item.co2Emissions > 100 ? (
                      <div className="sad-face-2">
                        <img src={sadface} />
                      </div>
                    ) : (
                      <div className="sad-face-2">
                        <img src={happyface} />
                      </div>
                    )}
                  </h6>
                  <h6>mot expiry date: {item.motExpiryDate}</h6>
                  <h6>tax due date: {item.taxDueDate}</h6>
                  <h6>make: {item.make}</h6>
                  <h6>colour: {item.colour}</h6>
                </div>
              ) : (
                <div>
                  <h6></h6>
                </div>
              )}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
