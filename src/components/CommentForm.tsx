import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Box,
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

import { addComment } from '../store/actions/posts.actions';
import { IPostComment } from '../store/types/posts';

const useStyles = createStyles({
  formCollapse: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  }
});

interface IProps {
  in: boolean;
  id: number;
  post: number;
  callback?: Function;

  addComment: Function;
  classes: {
    formCollapse: string;
  },
}

interface IState {
  commentData: {
    name: string;
    email: string;
    body: string;
  }
}

class CommentForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.createComment = this.createComment.bind(this);

    this.state = {
      commentData: {
        name: '',
        email: '',
        body: '',
      }
    };
  }

  createComment() {
    if (
      !this.state.commentData.name || this.state.commentData.name.length <= 0
      || !this.state.commentData.email || this.state.commentData.email.length <= 0
      || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.commentData.email)
      || !this.state.commentData.body || this.state.commentData.body.length <= 0
    ) {
      return false;
    }

    const newComment: IPostComment = {
      id: this.props.id,
      postId: this.props.post,
      name: this.state.commentData.name,
      body: this.state.commentData.body,
      email: this.state.commentData.email,
    };

    this.props.addComment(newComment.postId, newComment);
    this.setState((prevState) => ({
      ...prevState,
      commentData: {
        name: '',
        email: '',
        body: '',
      }
    }));

    if (!!this.props.callback) {
      this.props.callback();
    }
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
      <Collapse
        in={this.props.in}
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
                  onClick={this.createComment}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Collapse>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addComment: (id: number, comment: IPostComment) => dispatch(addComment(id, comment))
})

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(CommentForm));