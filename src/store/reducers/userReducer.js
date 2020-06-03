import {
  SET_AUTHENTICATED,
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
  ACTIVATE_HAYEK_PRO,
} from "../types";

const initialState = {
  isAuthenticated: false,
  prefersDarkmode: false,
  isConfirmed: false,
  isAnalyst: false,
  isProTier: false,
  id: null,
  username: null,
  upvotes: [],
  downvotes: [],
  bookmarks: [],
  following: [],
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
    case ACTIVATE_HAYEK_PRO:
      return { ...state, isProTier: true };
    case UPVOTE_IDEA:
      return {
        ...state,
        upvotes: [
          ...state.upvotes,
          {
            ideaId: action.payload.id,
            userId: state.id,
          },
        ],
        downvotes: state.downvotes.filter(
          (downvote) => downvote.ideaId !== action.payload.id
        ),
      };
    case REMOVE_UPVOTE:
      return {
        ...state,
        upvotes: state.upvotes.filter(
          (upvote) => upvote.ideaId !== action.payload.id
        ),
      };
    case DOWNVOTE_IDEA:
      return {
        ...state,
        downvotes: [
          ...state.downvotes,
          {
            ideaId: action.payload.id,
            userId: state.id,
          },
        ],
        upvotes: state.upvotes.filter(
          (upvote) => upvote.ideaId !== action.payload.id
        ),
      };
    case REMOVE_DOWNVOTE:
      return {
        ...state,
        downvotes: state.downvotes.filter(
          (downvote) => downvote.ideaId !== action.payload.id
        ),
      };
    case BOOKMARK_IDEA:
      return {
        ...state,
        bookmarks: [
          ...state.bookmarks,
          {
            ideaId: action.payload.id,
            userId: state.id,
          },
        ],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.ideaId !== action.payload.id
        ),
      };
    case FOLLOW_ANALYST:
      return {
        ...state,
        following: [
          ...state.following,
          {
            id: action.payload.id,
            username: action.payload.username,
          },
        ],
      };
    case UNFOLLOW_ANALYST:
      return {
        ...state,
        following: state.following.filter(
          (analyst) => analyst.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}
