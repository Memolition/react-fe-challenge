import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Fab,
  List,
  Divider,
  Container,
  Typography,
  IconButton
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { AddCircle, HighlightOff } from '@material-ui/icons';

import { IPost, IPostComment } from '../store/types/posts';
import { IAppState } from '../store/types/store';
import { setPosts, addComment } from '../store/actions/posts.actions';
import Post from './Post';
import PostForm from './PostForm';

interface IProps {
  //State
  posts: IPost[];

  //Dispatch
  setPosts: Function;
  addComment: Function;
  classes: {
    list: string;
    headRow: string;
  };
}

interface IState {
  fetching: boolean;
  addPost: boolean;
}

const useStyles = createStyles({
  list: {
    width: '100%',
    maxWidth: 'unset',
  },
  headRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      fetching: false,
      addPost: false,
    }

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
              currentPost.comments = currentPost.comments || [];
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
    this.setState({
      fetching: true,
    });
    await this.fetchPosts();

    this.setState({
      fetching: false,
    })
  }

  render() {
    return (
      <Container style={{
        paddingTop: 15
      }}>
        <Box className={this.props.classes.headRow} flexDirection="row">
          <Typography variant="h3">Posts</Typography>
          <Fab color="secondary" onClick={() => {
            this.setState((prevState) => ({
              addPost: !prevState.addPost
            }))
          }}>
            {this.state.addPost ? <HighlightOff /> : <AddCircle />}
          </Fab>
        </Box>
        <PostForm
          in={this.state.addPost}
          id={!!this.props.posts && this.props.posts.length > 0 ? this.props.posts.length + 1 : 1}
          callback={() => {
            this.setState({
              addPost: false,
            })
          }}
        />
        {
          !!this.props.posts && !this.state.fetching ? (
            <List className={this.props.classes.list}>
              {
                this.props.posts.map((post: IPost, postIndex: number) => (
                  <React.Fragment key={`post_${postIndex}`}>
                    <Post post={post} index={postIndex} />
                    {
                      postIndex < this.props.posts.length - 1 && <Divider />
                    }
                  </React.Fragment>
                ))
              }
            </List>
          ) : (
            <Typography>
              { this.state.fetching ? 'Loading posts...' : 'No posts available.'}
            </Typography>
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