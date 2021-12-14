import axios from "axios";
import AuthService from "./auth.service";
import authHeader from "./auth-header";

const currentUser = AuthService.getCurrentUser();

const API_URL = "http://localhost:8080/api/object/";

const addingObjects = (objectName, objectType) => {
  return axios.post(
    API_URL + currentUser.username + "/add",
    {
      objectName, 
      objectType
    },
    { headers: authHeader() }
  );
};

const getObjects = () => {
  return axios.get(
    API_URL + currentUser.username + "/get",
    { headers: authHeader() }
  )
}

export default addingObjects;