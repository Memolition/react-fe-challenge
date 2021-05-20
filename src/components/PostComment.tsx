import React, { Component } from 'react';

import {
  Box,
  Paper,
  Typography,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { IPostComment } from '../store/types/posts';

interface IProps {
  comment: IPostComment;
  classes: {
    wrapper: string;
    header: string;
    title: string;
    email: string;
  }
}

const useStyles = createStyles({
  wrapper: {
    marginBottom: 15,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  email: {
    color: 'gray',
    textTransform: 'lowercase',
    fontSize: '0.8rem',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
  },
  header: {
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
  }
});

class PostComment extends Component<IProps, {}> {
  classes = this.props.classes;

  render() {
    return (
      <Paper onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} elevation={0} className={this.classes.wrapper}>
        <Box className={this.classes.header} flexDirection="row">
          <Typography component="h3" className={this.classes.title}>{this.props.comment.name}</Typography>
          <Typography component="caption" className={this.classes.email}>- {this.props.comment.email}</Typography>
        </Box>
        <Typography component="p">{this.props.comment.body}</Typography>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(PostComment);