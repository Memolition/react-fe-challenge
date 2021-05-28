import React, { Component } from 'react';
import {
  Divider,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import { withStyles, createStyles } from '@material-ui/core/styles';

import { IPost, IPostComment } from '../store/types/posts';
import PostComment from './PostComment';
import CommentForm from './CommentForm';
import PostCommentsList from './PostCommentsList';

interface IProps {
  index: number;
  post: IPost;
  classes: {
    wrapper: string;
    comments: string;
    postBody: string;
    primaryText: string;
    secondaryText: string;
    itemContent: string;
  };
}

interface IState {
  viewComments: boolean;
  addComment: boolean;
}

const useStyles = createStyles({
  wrapper: {
    cursor: 'pointer',
    width: '100%',
    maxWidth: 'unset',
    flexDirection: 'column',
  },
  postBody: {
    width: '100%',
    maxWidth: 'unset',
    flexDirection: 'column',
  },
  primaryText: {
    width: '100%',
    maxWidth: 'unset',
    display: 'flex'
  },
  secondaryText: {
    width: '100%',
    maxWidth: 'unset',
  },
  comments: {
    marginTop: 10,
    paddingLeft: 25,
  },
  itemContent: {
    width: '100%',
    display: 'flex',
  }
});

class Post extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.commentAdded = this.commentAdded.bind(this);

    this.state = {
      viewComments: false,
      addComment: false,
    };
  }

  commentAdded() {
    this.setState({
      addComment: false,
      viewComments: true,
    })
  }

  render() {
    return (
      <>
        <ListItem
          button
          className={this.props.classes.wrapper}
          onClick={() => {
            this.setState((prevState) => ({
              viewComments: !prevState.viewComments
            }))
          }}
        >
          <ListItemText
            className={this.props.classes.postBody}
            classes={{
              primary: this.props.classes.primaryText,
              secondary: this.props.classes.secondaryText
            }}
            primary={this.props.post.title}
            secondary={this.props.post.title}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Reply" aria-label="reply">
              <IconButton
                edge="end"
                aria-label="reply"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  this.setState((prevState) => ({
                    addComment: !prevState.addComment
                  }))
                }}
              >
                <CommentIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <CommentForm
          in={this.state.addComment}
          id={this.props.post.comments ? this.props.post.comments.length + 1 : 1}
          post={this.props.post.id}
          callback={this.commentAdded}
        />
        {
          !!this.props.post.comments && (
            <PostCommentsList
              in={this.state.viewComments}
              id={this.props.post.id}
              comments={this.props.post.comments}
            />
          )
        }
      </>
    );
  }
}

export default withStyles(useStyles)(Post);