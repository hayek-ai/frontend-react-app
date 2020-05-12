import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_CONFIRMED,
} from "../types";

import axios from "../../util/axios";
import jwtDecode from "jwt-decode";

export const signupUser = (newUserData) => (dispatch) => {
  return axios
    .post("/register", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.accessToken);
      dispatch({
        type: SET_USER,
        payload: res.data.user,
      });
      return [];
    })
    .catch((err) => err.response.data.errors);
};

const setAuthorizationHeader = (token) => {
  const accessToken = `Bearer ${token}`;
  localStorage.setItem("accessToken", accessToken);
  axios.defaults.headers.common["Authorization"] = accessToken;
};
