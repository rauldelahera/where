import React, { useState, useEffect } from "react";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";

// Getting Marks From DB and API START
import axios from "axios";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
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

  markers.map((x) => console.log(x.objectName));

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
            icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
            position={centerCurrnet}
          />
          {markers.map((x) => (
            <Marker
              position={{ lat: x.latitude, lng: x.longitude }}
              key={x.id}
              onClick={() => {
                setSelected(x);
              }}
            />
          ))}
          {/* {selected.map((y) => (
            <InfoWindow
              position={{ lat: y.latitude, lng: y.longitude }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h4>You left here!</h4>
                <p>{y.objectName}</p>
              </div>
            </InfoWindow>
          ))} */}

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
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
}
