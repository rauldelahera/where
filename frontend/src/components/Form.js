import React, { useCallback, useState, useEffect, useReducer } from "react";

import axios from "axios";
import addingLocation from "../services/location.service";
import { useDropzone } from "react-dropzone";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import getObjects from "../services/object.service";

import deleteLocation from "../services/delete.services";

const currentUser = AuthService.getCurrentUser();

export default function Form() {
  const [objects, setObjects] = React.useState([]);
  // const [inputs, setInputs] = useState({});

  const [markers, setMarkers] = React.useState([]);

  const [values, setValues] = React.useState();

  const [status, setStatus] = useState(null);

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

  function Dropzone({ username }) {
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);
      setStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(
          `http://localhost:8080/api/fileupload/${username}/imagelocation/upload/${values.value}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          setStatus("File uploaded successfully!");
          console.log("File uploaded successfully!");
          refreshPage();
        })
        .catch((err) => {
          setStatus("Error Uploading!");
          console.log(err);
        });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="map-image-drop">
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag 'n' drop your images here, or click to select them</p>
          )}
        </div>
        <div>{status}</div>
      </div>
    );
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setValues((values) => ({ values, value }));
  };

  const handleDelete = ({ target }) => {
    let response = target.value;
    let array = response.split(",");

    deleteLocation(array[2]);
    refreshPage();
  };

  return (
    <div className="form-padding">
      <form>
        <select onChange={handleChange} className="select-map">
          <option>choose an object</option>
          {objects.map((object) => {
            return (
              <option value={object.objectName}>{object.objectName}</option>
            );
          })}
        </select>
      </form>
      <Dropzone {...currentUser} />
      <div className="marks">
        {markers.map((mark) => (
          <ul>
            <li>
              <h5 className="map-marks">Mark title: {mark.objectName}</h5>
              <button
                className="map-delete"
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
