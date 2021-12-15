import axios from "axios";
import AuthService from "./auth.service";
import authHeader from "./auth-header";

const currentUser = AuthService.getCurrentUser();

const deleteLocation = (objectName) => {
  return axios.delete(
    `http://localhost:8080/api/location/${currentUser.username}/delete`,
    {
      data: { objectName: objectName },
      headers: { Authorization: authHeader() },
    }
  );
};

export default deleteLocation;
