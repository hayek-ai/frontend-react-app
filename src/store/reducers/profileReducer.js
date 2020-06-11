import {
  SET_PROFILE,
  SET_BOOKMARKS,
  FOLLOW_ANALYST,
  UNFOLLOW_ANALYST,
  SET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  ADD_IDEA,
  CLOSE_IDEA,
} from "../types";

const initialState = {
  bookmarkedIdeas: [],
  reviews: [],
  followers: [],
  following: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      const sorted_ideas = [...action.payload.ideas].sort(ideaSortCallback);
      return {
        ...state,
        ...action.payload,
        ideas: sorted_ideas,
      };
    case SET_BOOKMARKS:
      let sorted_bookmarks = [...action.payload].sort(ideaSortCallback);
      return { ...state, bookmarkedIdeas: sorted_bookmarks };
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
    case ADD_IDEA:
      return {
        ...state,
        ideas: [action.payload, ...state.ideas],
      };
    case CLOSE_IDEA:
      const filteredIdeas = state.ideas.filter(
        (idea) => idea.id !== action.payload.id
      );
      filteredIdeas.push(action.payload);
      return {
        ...state,
        ideas: filteredIdeas.sort(ideaSortCallback),
      };
    default:
      return state;
  }
}

function ideaSortCallback(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  } else if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 0;
  }
}
