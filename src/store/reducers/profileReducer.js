import {
  SET_PROFILE,
  SET_BOOKMARKS,
  FOLLOW_ANALYST,
  UNFOLLOW_ANALYST,
  SET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
} from "../types";

const initialState = {
  bookmarkedIdeas: [],
  reviews: [],
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
    case SET_REVIEWS:
      return { ...state, reviews: [...action.payload] };
    case ADD_REVIEW:
      return {
        ...state,
        reviewStarTotal: state.reviewStarTotal + action.payload.stars,
        numReviews: state.reviewStarTotal + 1,
        reviews: [action.payload, ...state.reviews],
      };
    case DELETE_REVIEW:
      const deletedReview = state.reviews.find(
        (review) => review.id === action.payload
      );
      return {
        ...state,
        reviewStarTotal: state.reviewStarTotal - deletedReview.stars,
        numReviews: state.numReviews - 1,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };
    default:
      return state;
  }
}
