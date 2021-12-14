import React from "react";
import { useState } from "react";
import addingLocation from "../services/location.service";
export default function Form() {
  const [objects, getObjects] = useState([]);
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

  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "https://jsonplaceholder.typicode.com/todos/"
    );
    const products = data;
    setProducts(products);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
