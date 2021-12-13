import React from "react";
import { useState } from "react";
import locationServices from "../services/location.service";
export default function Form() {
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

  locationServices(titleAfterState, latAfterState, lngAfterState);

  const handleSubmit = (event) => {
    event.preventDefault();
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
