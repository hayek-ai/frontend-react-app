import {
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_CONFIRMED,
  TOGGLE_DARKMODE,
  UPVOTE_IDEA,
  REMOVE_UPVOTE,
  DOWNVOTE_IDEA,
  REMOVE_DOWNVOTE,
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
    })
    .catch((err) => err.response.data.errors);
};

export const confirmUser = (verificationCode) => (dispatch) => {
  return axios
    .get(`/user/confirm/${verificationCode}`)
    .then(() => {
      dispatch({ type: SET_CONFIRMED });
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
    })
    .catch(() => dispatch({ type: SET_UNAUTHENTICATED }));
};

export const toggleDarkmode = (prefersDarkmode, userId) => (dispatch) => {
  axios
    .put(`/user/${userId}`, {
      prefersDarkmode: !prefersDarkmode,
    })
    .then(() =>
      dispatch({
        type: TOGGLE_DARKMODE,
        payload: !prefersDarkmode,
      })
    )
    .catch((err) => console.log(err.response.data.errors));
};

const setAuthorizationHeader = (token) => {
  const accessToken = `Bearer ${token}`;
  localStorage.setItem("accessToken", accessToken);
  axios.defaults.headers.common["Authorization"] = accessToken;
};

export const upvoteIdea = (ideaId) => (dispatch) => {
  return axios
    .post(`/idea/${ideaId}/upvote`)
    .then((res) => {
      dispatch({
        type: UPVOTE_IDEA,
        payload: res.data.idea,
      });
      return res.data.idea;
    })
    .catch((err) => console.log(err.response.data.errors));
};

export const removeUpvote = (ideaId) => (dispatch) => {
  return axios
    .post(`/idea/${ideaId}/upvote`)
    .then((res) => {
      dispatch({
        type: REMOVE_UPVOTE,
        payload: res.data.idea,
      });
      return res.data.idea;
    })
    .catch((err) => console.log(err.response.data.errors));
};

export const downvoteIdea = (ideaId) => (dispatch) => {
  return axios
    .post(`/idea/${ideaId}/downvote`)
    .then((res) => {
      dispatch({
        type: DOWNVOTE_IDEA,
        payload: res.data.idea,
      });
      return res.data.idea;
    })
    .catch((err) => console.log(err.response.data.errors));
};

export const removeDownvote = (ideaId) => (dispatch) => {
  return axios
    .post(`/idea/${ideaId}/downvote`)
    .then((res) => {
      dispatch({
        type: REMOVE_DOWNVOTE,
        payload: res.data.idea,
      });
      return res.data.idea;
    })
    .catch((err) => console.log(err.response.data.errors));
};
