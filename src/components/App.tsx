import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  List,
  Divider,
  Container,
  Typography
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

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
  classes: {
    list: string;
  };
}

const useStyles = createStyles({
  list: {
    width: '100%',
    maxWidth: 'unset',
  }
});

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
      <Container>
        <Typography variant="h3">Posts</Typography>
        {
          !!this.props.posts && (
            <List className={this.props.classes.list}>
              {
                this.props.posts.map((post: IPost, postIndex: number) => (
                  <>
                    <Post post={post} key={`post_${postIndex}`} index={postIndex} />
                    {
                      postIndex < this.props.posts.length - 1 && <Divider />
                    }
                  </>
                ))
              }
            </List>
          )
        }
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(App));