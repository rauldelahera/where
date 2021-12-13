import React from "react";
import AuthService from "../services/auth.service";
import logo from "../img/wdili.jpeg";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron text-center">
        <h3>
          <strong>{currentUser.username}</strong> Profile Page
        </h3>
      </header>
      <div className="profile">
        <div className="profile-1">
          <p>
            <strong>Your security Token:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
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
        </div>
        <div className="profile-2">
          <img src={logo} alt="app logo" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
