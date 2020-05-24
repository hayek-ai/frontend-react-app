import axios from "./util/axios";

export const getIdeaFeed = (feedType, queryString) => {
  return axios
    .get(`/ideas/${feedType}?${queryString}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getIdea = (ideaId) => {
  return axios
    .get(`/idea/${ideaId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getReport = (ideaId) => {
  return axios
    .get(`/idea/${ideaId}/download`)
    .then((res) => {
      res.data.comments.sort(commentSortCallback);
      return res.data;
    })
    .catch((err) => console.log(err));
};

// returns updated idea with comment
export const submitComment = (ideaId, body) => {
  return axios
    .post(`/idea/${ideaId}/comment`, { body: body })
    .then((res) => {
      res.data.idea.comments.sort(commentSortCallback);
      return res.data.idea;
    })
    .catch((err) => err.response.data);
};

// deletes comment and returns updated idea
export const deleteComment = (commentId) => {
  return axios
    .delete(`/comment/${commentId}`)
    .then((res) => {
      res.data.idea.comments.sort(commentSortCallback);
      return res.data.idea;
    })
    .catch((err) => err.response.data);
};

export const fetchStockInfo = (symbol, withChart) => {
  if (withChart) {
    return axios
      .get(`/stock/${symbol}?withChart=true`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  } else {
    return axios
      .get(`/stock/${symbol}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
};

export const searchAutocomplete = (query) => {
  return axios
    .get(`/autosearch?q=${query}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getLeaderboard = (queryString) => {
  // =======PARAMS=======
  // sortColumn: "analyst_rank", "success_rate", "avg_return", "num_ideas", "avg_holding_period", "num_followers"
  // orderType: "desc" or "asc"
  // page (int)
  // pageSize (int)
  return axios
    .get(`/leaderboard?${queryString}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const sendPasswordResetLink = (email) => {
  return axios
    .post("/user/reset-password", { email: email })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const resetPassword = (resetId, password) => {
  return axios
    .post(`/user/reset-password/${resetId}`, { password: password })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

function commentSortCallback(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  } else if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 0;
  }
}
