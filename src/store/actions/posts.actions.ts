import {
  IPost,
  IPostComment,
  SET_POSTS,
  ADD_COMMENT,
} from '../types/posts';

export const setPosts = (posts: IPost[]) => ({
  type: SET_POSTS,
  posts
});

export const addComment = (id: number, comment: IPostComment) => ({
  type: ADD_COMMENT,
  id,
  comment,
});