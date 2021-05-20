import React, { Component } from 'react';

import {
  Paper,
  Divider,
  Typography,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { IPost } from '../store/types/posts';

interface IProps {
  post: IPost;
  classes: {
    wrapper: string;
  }
}

const useStyles = createStyles({
  wrapper: {
    marginBottom: 15,
    padding: 10,
  }
});

class Post extends Component<IProps, {}> {

  render() {
    return (
      <Paper variant="outlined" className={this.props.classes.wrapper}>
        <Typography component="h3">{this.props.post.title} </Typography>
        <Divider light />

      </Paper>
    );
  }
}

export default withStyles(useStyles)(Post);