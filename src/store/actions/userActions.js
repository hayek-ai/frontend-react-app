import {
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_CONFIRMED,
  UPVOTE_IDEA,
  REMOVE_UPVOTE,
  DOWNVOTE_IDEA,
  REMOVE_DOWNVOTE,
  BOOKMARK_IDEA,
  REMOVE_BOOKMARK,
  FOLLOW_ANALYST,
  UNFOLLOW_ANALYST,
  CANCEL_SUBSCRIPTION,
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
    .catch((err) => {
      if (err.response) {
        return err.response.data.errors;
      } else {
        console.log(err);
      }
    });
};

export const confirmUser = (verificationCode) => (dispatch) => {
  return axios
    .get(`/user/confirm/${verificationCode}`)
    .then(() => {
      dispatch({ type: SET_CONFIRMED });
    })
    .catch((err) => {
      if (err.response) {
        return err.response.data.errors;
      } else {
        console.log(err);
      }
    });
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
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
};

export const bookmarkIdea = (ideaId) => (dispatch) => {
  return axios
    .post(`/idea/${ideaId}/bookmark`)
    .then((res) => {
      dispatch({
        type: BOOKMARK_IDEA,
        payload: res.data.idea,
      });
      return res.data.idea;
    })
    .catch((err) => console.log(err));
};

export const removeBookmark = (ideaId) => (dispatch) => {
  return axios
    .post(`/idea/${ideaId}/bookmark`)
    .then((res) => {
      dispatch({
        type: REMOVE_BOOKMARK,
        payload: res.data.idea,
      });
      return res.data.idea;
    })
    .catch((err) => console.log(err));
};

export const updateUser = (formData) => (dispatch) => {
  const token = localStorage.accessToken;
  const decodedToken = jwtDecode(token);

  return axios
    .put(`/user/${decodedToken.identity}`, formData)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const followAnalyst = (analystId) => (dispatch) => {
  return axios
    .post(`/analyst/${analystId}/follow`)
    .then((res) => {
      dispatch({
        type: FOLLOW_ANALYST,
        payload: res.data.analyst,
      });
    })
    .catch((err) => console.log(err));
};

export const unfollowAnalyst = (analystId) => (dispatch) => {
  return axios
    .post(`/analyst/${analystId}/follow`)
    .then((res) => {
      dispatch({
        type: UNFOLLOW_ANALYST,
        payload: res.data.analyst,
      });
    })
    .catch((err) => console.log(err));
};

export const cancelSubscription = () => (dispatch) => {
  return axios
    .post("/cancel-subscription")
    .then((res) => {
      dispatch({
        type: CANCEL_SUBSCRIPTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
