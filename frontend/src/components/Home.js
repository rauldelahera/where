import React, { useState, useEffect } from "react";
import logo from "../img/wdili.jpeg";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron text-center home-hide">
        <h3>{content}</h3>
      </header>
      <div className="home">
        <div className="home-1">
          <h2 className="home-1-inner">
            WDILI is an App for... Someone needs to write some cool stuff here
            I'm not good with creative writing
          </h2>
        </div>
        <div className="home-2">
          <img src={logo} alt="logo of the website" />
        </div>
        <div className="home-3">
          <h2 className="home-3-inner">
            If you are not good with your memory, don't worry, WDILI is here to
            help you, when you need to remember!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
