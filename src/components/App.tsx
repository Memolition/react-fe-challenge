import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IPost, IPostComment } from '../store/types/posts';
import { IAppState } from '../store/types/store';
import { setPosts, addComment } from '../store/actions/posts.actions';
import Post from './Post';

interface IProps {
  //State
  posts: IPost[];

  //Dispatch
  setPosts: Function;
  addComment: Function;
}

class App extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
  }

  async fetchPosts() {
    const fetchRequest = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await fetchRequest.json();

    if (!!posts && posts.length > 0) {
      const comments = await this.fetchComments();
      if (!!comments && comments.length > 0) {
        comments.forEach((comment: any) => {
          if (!!comment && !!comment.postId) {
            const currentPost = posts.find((post: IPost) => post.id === comment.postId);
            if (!!currentPost) {
              if (!currentPost.comments) {
                currentPost.comments = [];
              }

              currentPost.comments.push(comment);
            }
          }
        })
      }

      this.props.setPosts(posts);
    }
  }

  async fetchComments() {
    return fetch('https://jsonplaceholder.typicode.com/comments')
      .then((r) => r.json())
      .then((r) => {
        return (!!r && r.length > 0) ? r : [];
      })
      .catch((e) => { console.log(e); });
  }

  async componentDidMount() {
    await this.fetchPosts();
  }

  render() {
    return (
      <div>
        {
          !!this.props.posts && (
            this.props.posts.map((post: IPost, postIndex: number) => (
              <Post post={post} key={`post_${postIndex}`} index={postIndex} />
            ))
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
  posts: state.posts.posts
});

const mapDispatchToProps = (dispatch: any) => ({
  setPosts: (posts: IPost[]) => dispatch(setPosts(posts)),
  addComment: (id: number, comment: IPostComment) => dispatch(addComment(id, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);