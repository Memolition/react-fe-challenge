export const SET_POSTS = 'SET_POSTS';

export interface IPostComment {
  post: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IPost {
  user: number;
  id: number;
  title: string;
  body: string;

  comments?: IPostComment[];
}

export interface IPostsState {
  posts: IPost[];
}

export const InitialPostsState: IPostsState = {
  posts: [],
};