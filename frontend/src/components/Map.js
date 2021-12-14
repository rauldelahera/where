import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";

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
const center = {
  lat: 51.5007,
  lng: -0.1246,
};

export default function Map() {
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
  console.log(centerCurrnet);

  // Setting current possition end
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map-main">

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        onLoad={getLocation}
        center={centerCurrnet}
      >
        <Marker
          icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
          position={centerCurrnet}
        />

        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                Alert
              </h2>
              <p>Item Left {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <p>{status}</p>
      <button onClick={getLocation}>Get my location</button>
    </div>
  );
              }