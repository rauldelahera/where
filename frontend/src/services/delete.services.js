import axios from "axios";
import AuthService from "./auth.service";
import authHeader from "./auth-header";

const currentUser = AuthService.getCurrentUser();

const API_URL = "http://localhost:8080/api/location/";

const deleteLocation = (id, username, objectName, longitude, latitude) => {
  return axios.post(
    API_URL + currentUser.username + "/delete",
    {
      id,
      username,
      objectName,
      longitude,
      latitude,
    },
    { headers: authHeader() }
  );
};

export default deleteLocation;
