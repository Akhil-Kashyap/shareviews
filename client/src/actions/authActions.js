import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login User
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      //save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Set Logged in User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Logout User
export const logoutUser = () => (dispatch) => {
  //remove local storage
  localStorage.removeItem("jwtToken");
  setAuthToken(false);

  //change state of is authenticated false and empty
  dispatch(setCurrentUser({}));
};
