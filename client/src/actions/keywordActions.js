import { getPosts } from "./postAction";

//Set Keyword and retrive posts
export const setKeyword = (keyword) => (dispatch) => {
  dispatch(getPosts(keyword));
};
