import React, {useState, useEffect, useCallback}  from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import {useDropzone} from "react-dropzone";

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

    function GetDownload() {
        const image = axios({
            method: 'get',
            url: `http://localhost:8080/api/fileupload/${currentUser.id}/image/download`,
            headers: {
                'Authorization': `Bearer ${currentUser.accessToken}`
            }
        })
        const imagelink = image.then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
        console.log(imagelink);
        return (
            <div>
                <img
                    src={`data:image/jpeg;base64,${imagelink}`
                    }/>
            </div>
        )
    }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
        <p>
            <strong>Token:</strong> {currentUser.accessToken}
      </p>
        <GetDownload/>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
        <ul>
            <Dropzone {...currentUser}/>
        </ul>
    </div>
  );
};

export default Profile;
