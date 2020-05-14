import axios from "./util/axios";

/************** IDEAS **************/
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
      // sort comments before returning idea
      res.data.comments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return res.data;
    })
    .catch((err) => console.log(err));
};

// deletes comment and returns updated idea
export const deleteComment = (commentId) => {
  return axios
    .delete(`/comment/${commentId}`)
    .then((res) => {
      // sort comments before returning idea
      res.data.idea.comments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return res.data.idea;
    })
    .catch((err) => err.response.data);
};
