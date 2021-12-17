import man from "../img/final_man.png";
import React, { useState, useEffect } from "react";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";

// Getting Marks From DB and API START
import axios from "axios";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import pin from "../img/128.png";
import horse from "../img/256.png";

const currentUser = AuthService.getCurrentUser();

const libraries = ["places"];
const mapContainerStyle = {
  height: "73vh",
  width: "40vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  // Getting Marks From DB and API START
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

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

  // Setting current possition start
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.watchPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const centerCurrnet = {
    lat: lat,
    lng: lng,
  };

  // Setting current possition end
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <p>{status}</p>
      <div className="map-main">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          options={options}
          onLoad={getLocation}
          center={centerCurrnet}
        >
          <Marker
            icon={{
              url: man,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            position={centerCurrnet}
          />
          {markers.map((x) => (
            <Marker
              icon={{
                url: pin,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              position={{ lat: x.latitude, lng: x.longitude }}
              animation={window.google.maps.Animation.DROP}
              key={x.id}
              onClick={() => {
                setSelected(x);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.latitude, lng: selected.longitude }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h6>You left here:</h6>
                <p>{selected.objectName}</p>
                <img
                  src={selected.locationImageLink}
                  style={{ width: "150px" }}
                />
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
}
