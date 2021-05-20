export const SET_POSTS = 'SET_POSTS';

export interface IPost {
  user: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostsState {
  posts: IPost[];
}

export const InitialPostsState: IPostsState = {
  posts: [],
};