import axios from "./util/axios";

/************** IDEAS **************/
export const getIdeaFeed = (feedType, queryString) => {
  return axios
    .get(`/ideas/${feedType}?${queryString}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
