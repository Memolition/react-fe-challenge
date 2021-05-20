import { combineReducers } from "redux";

import { IAppState } from '../types/store';
import PostsReducer from './PostsReducer';

const combinedReducer = combineReducers<IAppState>({
  posts: PostsReducer,
});

export default combinedReducer;