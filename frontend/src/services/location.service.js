import axios from "axios";
import AuthService from "./auth.service";
import authHeader from "./auth-header";

const currentUser = AuthService.getCurrentUser();

const API_URL = "http://localhost:8080/api/location/";

const addingLocation = (objectName, latitude, longitude) => {
  return axios.post(
    API_URL + currentUser.username + "/add",
    {
      objectName,
      latitude,
      longitude,
    },
    { headers: authHeader() }
  );
};

export default addingLocation;