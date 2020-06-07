import {
  SET_PROFILE,
  SET_BOOKMARKS,
  SET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  ADD_IDEA,
  CLOSE_IDEA,
} from "../types";

import axios from "../../util/axios";
import jwtDecode from "jwt-decode";

export const setProfile = (username) => (dispatch) => {
  const token = localStorage.accessToken;
  const decodedToken = jwtDecode(token);

  return axios
    .get(`/user/${username}`)
    .then((res) => {
      res.data.isOwn = decodedToken.identity === res.data.id;
      dispatch({
        type: SET_PROFILE,
        payload: res.data,
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

export const setProfileBookmarks = (username) => (dispatch) => {
  return axios
    .get(`/user/${username}/bookmarks`)
    .then((res) => {
      dispatch({
        type: SET_BOOKMARKS,
        payload: res.data.ideas,
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

export const setProfileReviews = (analystId) => (dispatch) => {
  return axios
    .get(`/analyst/${analystId}/reviews`)
    .then((res) => {
      dispatch({
        type: SET_REVIEWS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// reviewData = {title, body, stars}
export const postReview = (analystId, reviewData) => (dispatch) => {
  return axios
    .post(`/analyst/${analystId}/review`, reviewData)
    .then((res) => {
      dispatch({
        type: ADD_REVIEW,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteReview = (reviewId) => (dispatch) => {
  return axios
    .delete(`/review/${reviewId}`)
    .then(() =>
      dispatch({
        type: DELETE_REVIEW,
        payload: reviewId,
      })
    )
    .catch((err) => console.log(err));
};

export const uploadIdea = (formData) => (dispatch) => {
  return axios
    .post("/new-idea", formData)
    .then((res) => {
      dispatch({
        type: ADD_IDEA,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        return err.response.data.errors;
      } else {
        console.log(err);
      }
    });
};

export const closeIdea = (ideaId) => (dispatch) => {
  return axios
    .put(`/idea/${ideaId}`, { closedDate: new Date().toUTCString() })
    .then((res) => {
      dispatch({
        type: CLOSE_IDEA,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => console.log(err));
};
