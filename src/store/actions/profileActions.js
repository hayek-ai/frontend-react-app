import { SET_PROFILE, SET_BOOKMARKS } from "../types";

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
    .catch((err) => err.response.data);
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
    .catch((err) => err.response.data);
};
