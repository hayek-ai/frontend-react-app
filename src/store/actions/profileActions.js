import { SET_PROFILE } from "../types";

import axios from "../../util/axios";
import jwtDecode from "jwt-decode";

export const getProfile = (username) => (dispatch) => {
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
