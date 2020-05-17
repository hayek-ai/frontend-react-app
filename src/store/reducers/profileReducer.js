import {
  SET_PROFILE,
  SET_BOOKMARKS,
  FOLLOW_ANALYST,
  UNFOLLOW_ANALYST,
} from "../types";

const initialState = {
  bookmarkedIdeas: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, ...action.payload };
    case SET_BOOKMARKS:
      return { ...state, bookmarkedIdeas: [...action.payload] };
    case FOLLOW_ANALYST:
      return action.payload.id === state.id
        ? { ...state, ...action.payload }
        : { ...state };

    case UNFOLLOW_ANALYST:
      return action.payload.id === state.id
        ? { ...state, ...action.payload }
        : { ...state };
    default:
      return state;
  }
}
