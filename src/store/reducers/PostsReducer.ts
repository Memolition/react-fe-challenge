import { Reducer } from 'redux';

import {
  IPostsState,
  InitialPostsState,
  SET_POSTS
} from '../types/posts';

const PostsReducer: Reducer<IPostsState> = (state: IPostsState = InitialPostsState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
};

export default PostsReducer;