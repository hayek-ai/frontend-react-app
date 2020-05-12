import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_CONFIRMED,
} from "../types";

const initialState = {
  isAuthenticated: false,
  isConfirmed: false,
  isAnalyst: false,
  isProTier: false,
  id: null,
  username: null,
  upvotes: [],
  downvotes: [],
  bookmarks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
