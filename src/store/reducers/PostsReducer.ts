import { Reducer } from 'redux';

import {
  IPost,
  IPostsState,
  InitialPostsState,
  SET_POSTS,
  ADD_COMMENT,
} from '../types/posts';

const PostsReducer: Reducer<IPostsState> = (state: IPostsState = InitialPostsState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: [...(state.posts.map((post: IPost) => {
          if (post.id === action.id) {
            if (!post.comments) {
              post.comments = [];
            }

            post.comments.unshift(action.comment);
          }

          return post;
        }))]
      }
    default:
      return state;
  }
};

export default PostsReducer;