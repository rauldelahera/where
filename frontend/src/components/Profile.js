import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import {useDropzone} from "react-dropzone";

import AuthService from "../services/auth.service";

import logo from "../img/wdili.jpeg";


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  function Dropzone({ id }) {
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      axios.post(`http://localhost:8080/api/fileupload/${id}/image/upload`,
          formData,
          {
            headers:{
              'Authorization': `Bearer ${currentUser.accessToken}`,
              "Content-Type": "multipart/form-data"
            }
          }
      ).then(() => {
        console.log("file uploaded successfully")
      }).catch(err => {
        console.log(err);
      })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
                <p>Drop the image here ...</p> :
                <p>Drag 'n' drop your images here, or click to select them</p>
          }
        </div>
    )
  }

  const [base64, setBase64] = useState();
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/fileupload/${currentUser.id}/image/download`,
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`
      },
      responseType: 'arraybuffer',
    })
        .then((response) =>
            setBase64(Buffer.from(response.data, "binary").toString("base64"))
        );
  }, []); 

  return (
    <div className="container">
      <header className="jumbotron text-center">
        <img src={`data:image/jpeg;charset=utf-8;base64,${base64}`} />
        <h3>
          <strong>{currentUser.username}</strong> Profile Page
        </h3>
      </header>
      <div className="profile">
        <div className="profile-1">
          <p>
            <strong>Your security Token:</strong>{" "}
            {currentUser.accessToken}
            {/* {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )} */}
          </p>
          <p>
            <strong>Your Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Your Email:</strong> {currentUser.email}
          </p>
          <strong>You are Authorized as:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
          <ul>
            <Dropzone {...currentUser}/>
          </ul>
        </div>
        <div className="profile-2">
          <img src={logo} alt="app logo" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
