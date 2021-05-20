import React, { Component } from 'react';

import {
  Paper,
  Divider,
  Typography,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { IPost, IPostComment } from '../store/types/posts';
import PostComment from './PostComment';

interface IProps {
  index: number;
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
  constructor(props: IProps) {
    super(props);

    console.log(this.props.post.comments, this.props.post.comments?.length);
  }


  render() {
    return (
      <Paper variant="outlined" className={this.props.classes.wrapper}>
        <Typography component="h3">{this.props.post.title} </Typography>
        <Divider light />
        {
          !!this.props.post.comments && this.props.post.comments.length > 0 && (
            this.props.post.comments.map((comment: IPostComment, commentIndex: number) => (
              <PostComment comment={comment} key={`post_${this.props.index}_comment_${commentIndex}`} />
            ))
          )
        }
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Post);