import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Map from "../components/Map";
import Form from "../components/Form";
const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="map">
      {/* <header className="jumbotron">
        <h3>{content}</h3> 
      </header> */}
      <div className="see-form">
        <Form />
      </div>
      <div className="see-map">
        <Map />
      </div>
    </div>
  );
};

export default BoardUser;
