import { getPosts } from "./postAction";
import { resetLocation } from "./locationAction";

//Set Keyword and retreive posts
export const setKeyword = (keyword) => (dispatch) => {
  dispatch(getPosts(keyword));
  dispatch(resetLocation());
};
