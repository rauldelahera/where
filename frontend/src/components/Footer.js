import React from "react";
import jack from "../img/jack.png";
import max from "../img/max.png";
import raul from "../img/raul.png";
import rumen from "../img/rumen.png";

export default function Footer() {
  return (
    <div className="footer">
      <footer className="bg-primary text-center text-white">
        <div className=" p-1">
          <h5 className="made-text"> Made by </h5>
          <div className="creator">
            <div className="box1">
              <img className="footer-images" src={jack} alt="creator" />
              <h5>'Jack'</h5>
            </div>
            <div className="box2">
              <img className="footer-images" src={max} alt="creator" />
              <h5>'Max'</h5>
            </div>
            <div className="box3">
              <img className="footer-images" src={raul} alt="creator" />
              <h5>'Raul'</h5>
            </div>
            <div className="box4">
              <img className="footer-images" src={rumen} alt="creator" />
              <h5>'Rumen'</h5>
            </div>
          </div>
        </div>

        <div className="p-2">
          <h6> This App is possible, thanks to </h6>
          <img
            className="makers-logo"
            src="https://makers.tech/wp-content/themes/wp-makers-2018/assets/images/logo-makers.svg"
            alt="makers logo"
          />{" "}
          &
          <img
            className="makers-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
            alt="makers logo"
          />
          searches
        </div>
      </footer>
    </div>
  );
}
