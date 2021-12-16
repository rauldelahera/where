import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/object/";

const user = AuthService.getCurrentUser();


const queryDVLA = (object, data) => {
    return axios
    .post(API_URL + `${user.username}/dvla/${object}`,
    data,
    { headers: authHeader() }
    ).then((response) => {
        console.log(response.data);
        return response.data
    })
};

export default queryDVLA;   