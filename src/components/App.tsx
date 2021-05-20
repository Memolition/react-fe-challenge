import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IPost, SET_POSTS } from '../store/types/posts';
import { IAppState } from '../store/types/store';
import Post from './Post';

interface IProps {
  //State
  posts: IPost[];

  //Dispatch
  setPosts: Function;
}

class App extends Component<IProps> {
  render() {
    return (
      <div>
        {
          JSON.stringify(this.props.posts)
        }
        {
          !!this.props.posts && (
            this.props.posts.map((post: IPost, postIndex: number) => (
              <Post post={post} key={`post_${postIndex}`} index={postIndex} />
            ))
          )
        }
        <button onClick={() => {
          this.props.setPosts([
            {
              user: 1,
              id: 0,
              title: "Post 1",
              body: "Lorem ipsum",
              comments: [
                {
                  "post": 1,
                  "id": 1,
                  "name": "id labore ex et quam laborum",
                  "email": "Eliseo@gardner.biz",
                  "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
                },
                {
                  "post": 1,
                  "id": 2,
                  "name": "quo vero reiciendis velit similique earum",
                  "email": "Jayne_Kuhic@sydney.com",
                  "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
                },
              ]
            },
            {
              user: 1,
              id: 2,
              title: "Post 2",
              body: "Lorem ipsum"
            }
          ])
        }}>Set dummy posts</button>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
  posts: state.posts.posts
});

const mapDispatchToProps = (dispatch: any) => ({
  setPosts: (posts: IPost[]) => dispatch({ type: SET_POSTS, posts })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);