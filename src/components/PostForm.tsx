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

import { addPost } from '../store/actions/posts.actions';
import { IPost } from '../store/types/posts';

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
  callback?: Function;

  addPost: Function;
  classes: {
    formCollapse: string;
  },
}

interface IState {
  postData: {
    title: string;
    body: string;
  }
}

class PostForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.createComment = this.createComment.bind(this);

    this.state = {
      postData: {
        title: '',
        body: '',
      }
    };
  }

  createComment() {
    if (
      !this.state.postData.title || this.state.postData.title.length <= 0
      || !this.state.postData.body || this.state.postData.body.length <= 0
    ) {
      return false;
    }

    const newPost: IPost = {
      userId: 1,
      id: this.props.id,
      title: this.state.postData.title,
      body: this.state.postData.body,
    };

    this.props.addPost(newPost);
    this.setState((prevState) => ({
      ...prevState,
      postData: {
        title: '',
        body: '',
      }
    }));

    if (!!this.props.callback) {
      this.props.callback();
    }
  }

  setPostData(value: string, field: string) {
    this.setState((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
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
        <FormControl style={{ marginTop: 10, width: '100%', }} onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}>
          <OutlinedInput
            type="text"
            placeholder="Write a Post title"
            value={this.state.postData['title']}
            onChange={(e) => { this.setPostData(e.target.value, 'title') }}
            style={{ width: '100%' }}
          />
        </FormControl>
        <FormControl style={{ marginTop: 10, width: '100%', }} onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}>
          <OutlinedInput
            type="text"
            multiline={true}
            placeholder="Type your post here..."
            value={this.state.postData['body']}
            onChange={(e) => { this.setPostData(e.target.value, 'body') }}
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
  addPost: (post: IPost) => dispatch(addPost(post))
})

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(PostForm));