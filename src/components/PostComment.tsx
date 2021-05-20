import React, { Component } from 'react';

import {
  Paper,
  Typography,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { IPostComment } from '../store/types/posts';

interface IProps {
  comment: IPostComment;
  classes: {
    wrapper: string;
    email: string;
  }
}

const useStyles = createStyles({
  wrapper: {
    marginBottom: 15,
    padding: 10,
  },
  email: {
    color: 'gray',
    textTransform: 'lowercase',
    fontSize: '0.8rem',
  }
});

class PostComment extends Component<IProps, {}> {
  classes = this.props.classes;

  render() {
    return (
      <Paper variant="outlined" className={this.classes.wrapper}>
        <Typography component="h3">{this.props.comment.name}</Typography>
        <Typography component="caption" className={this.classes.email}>{this.props.comment.email}</Typography>
        <Typography component="p">{this.props.comment.body}</Typography>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(PostComment);