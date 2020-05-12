import { SET_UNAUTHENTICATED, SET_USER, SET_CONFIRMED } from "../types";

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

export const loginUser = (userData) => (dispatch) => {
  return axios
    .post("/login", userData)
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

export const confirmUser = (verificationCode) => (dispatch) => {
  return axios
    .get(`/user/confirm/${verificationCode}`)
    .then(() => {
      dispatch({ type: SET_CONFIRMED });
      return [];
    })
    .catch((err) => err.response.data.errors);
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  const token = localStorage.accessToken;
  const decodedToken = jwtDecode(token);

  return axios
    .get(`/user/${decodedToken.identity}`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      return [];
    })
    .catch(() => dispatch({ type: SET_UNAUTHENTICATED }));
};

const setAuthorizationHeader = (token) => {
  const accessToken = `Bearer ${token}`;
  localStorage.setItem("accessToken", accessToken);
  axios.defaults.headers.common["Authorization"] = accessToken;
};
