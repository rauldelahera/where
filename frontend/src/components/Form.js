import React, { useState, useEffect, useReducer } from "react";
import addingLocation from "../services/location.service";
import axios from "axios";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import deleteLocation from "../services/delete.services";

const currentUser = AuthService.getCurrentUser();

export default function Form() {
  const [inputs, setInputs] = useState({});

  // Getting Marks From DB and API START
  const [markers, setMarkers] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/location/${currentUser.username}/get`,
        {
          headers: authHeader(),
        }
      );
      setMarkers(result.data);
    };

    fetchData();
  }, []);
  // Getting Marks From DB and API END
  // Delete marks from form START

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  let titleAfterState = inputs.title;
  let lngAfterState = parseFloat(inputs.lng);
  let latAfterState = parseFloat(inputs.lat);

  const handleSubmit = (event) => {
    // event.preventDefault();
    addingLocation(titleAfterState, latAfterState, lngAfterState);
    setInputs({});
  };

  const handleDelete = ({ target }) => {
    let response = target.value;
    let array = response.split(",");

    deleteLocation(array[2]);
  };

  return (
    <div className="form-padding">
      <form onSubmit={handleSubmit}>
        <label>
          Enter lng cordinates:
          <input
            type="number"
            name="lng"
            value={inputs.lng || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter lat cordinates:
          <input
            type="number"
            name="lat"
            value={inputs.lat || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Add title to your mark:
          <input
            type="text"
            name="title"
            value={inputs.title || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>

      <div className="marks">
        {markers.map((mark) => (
          <ul>
            <li>
              <h5>Mark title: {mark.objectName}</h5>
              <button
                value={[
                  mark.id,
                  mark.username,
                  mark.objectName,
                  mark.longitude,
                  mark.latitude,
                ]}
                onClick={handleDelete}
              >
                Delete
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
