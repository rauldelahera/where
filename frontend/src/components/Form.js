import React from "react";
import { useState } from "react";

export default function Form() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <div className="form-padding">
      <form onSubmit={handleSubmit}>
        <label>
          Enter lng cordinates:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter lat cordinates:
          <input
            type="number"
            name="age"
            value={inputs.age || ""}
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
