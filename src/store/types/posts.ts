export const SET_POSTS = 'SET_POSTS';
export const ADD_COMMENT = 'ADD_COMMENT';

export interface IPostComment {
  postId: number;
  id?: number;
  name: string;
  email: string;
  body: string;
}

export interface IPost {
  userId: number;
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