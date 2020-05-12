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
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case SET_UNAUTHENTICATED:
      return { ...initialState };
    case SET_USER:
      return { ...action.payload, isAuthenticated: true };
    case SET_CONFIRMED:
      return { ...state, isAuthenticated: true, isConfirmed: true };
    default:
      return state;
  }
}
