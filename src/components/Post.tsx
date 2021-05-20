import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Divider,
  Collapse,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CommentIcon from '@material-ui/icons/Comment';
import { withStyles, createStyles } from '@material-ui/core/styles';

import { addComment } from '../store/actions/posts.actions';
import { IPost, IPostComment } from '../store/types/posts';
import PostComment from './PostComment';

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
    formCollapse: string;
  },

  addComment: Function;
}

interface IState {
  viewComments: boolean;
  addComment: boolean;
  commentData: {
    name: string;
    email: string;
    body: string;
  }
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
  },
  formCollapse: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  }
});

class Post extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      viewComments: false,
      addComment: false,
      commentData: {
        name: '',
        email: '',
        body: '',
      }
    };
  }

  setCommentData(value: string, field: string) {
    this.setState((prevState) => ({
      ...prevState,
      commentData: {
        ...prevState.commentData,
        [field]: value,
      }
    }))
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
        <Collapse
          in={this.state.addComment}
          className={this.props.classes.formCollapse}
        >
          <Box flexDirection="row">
            <FormControl style={{ flex: 1 }} onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}>
              <OutlinedInput
                type="text"
                placeholder="Name"
                value={this.state.commentData['name']}
                onChange={(e) => { this.setCommentData(e.target.value, 'name') }}
                style={{ width: '100%' }}
              />
            </FormControl>
            <FormControl style={{ marginLeft: 10, flex: 1 }} onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}>
              <OutlinedInput
                type="text"
                placeholder="Your email"
                value={this.state.commentData['email']}
                onChange={(e) => { this.setCommentData(e.target.value, 'email') }}
                style={{ width: '100%' }}
              />
            </FormControl>
          </Box>
          <FormControl style={{ marginTop: 10, width: '100%', }} onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
            <OutlinedInput
              type="text"
              multiline={true}
              placeholder="Type your comment here..."
              value={this.state.commentData['body']}
              onChange={(e) => { this.setCommentData(e.target.value, 'body') }}
              style={{ width: '100%' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Save Reply"
                    onClick={() => {
                      if (
                        !this.state.commentData.name || this.state.commentData.name.length <= 0
                        || !this.state.commentData.email || this.state.commentData.email.length <= 0
                        || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.commentData.email)
                        || !this.state.commentData.body || this.state.commentData.body.length <= 0
                      ) {
                        return false;
                      }

                      const newComment: IPostComment = {
                        id: !!this.props.post.comments ? this.props.post.comments.length + 1 : 1,
                        postId: this.props.post.id,
                        name: this.state.commentData.name,
                        body: this.state.commentData.body,
                        email: this.state.commentData.email,
                      };

                      this.props.addComment(newComment.postId, newComment);
                      this.setState((prevState) => ({
                        ...prevState,
                        viewComments: true,
                        commentData: {
                          name: '',
                          email: '',
                          body: '',
                        }
                      }))
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Collapse>
        {
          !!this.props.post.comments && (
            <Collapse
              in={this.state.viewComments}
              key={`post_${this.props.index}_comments`}
            >
              <List>
                {this.props.post.comments.map((comment: IPostComment, commentIndex: number) => (
                  <React.Fragment key={`post_${this.props.index}_coments_${commentIndex}`}>
                    <PostComment comment={comment} />
                    {
                      !!this.props.post.comments && commentIndex < this.props.post.comments.length - 1 && <Divider light />
                    }
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          )
        }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addComment: (id: number, comment: IPostComment) => dispatch(addComment(id, comment))
})

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Post));