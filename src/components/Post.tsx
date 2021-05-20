import React, { Component } from 'react';

import {
  Paper,
  Divider,
  Typography,
  Collapse,
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

interface IState {
  viewComments: boolean;
}

const useStyles = createStyles({
  wrapper: {
    marginBottom: 15,
    padding: 10,
    cursor: 'pointer',
  }
});

class Post extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      viewComments: false
    };
  }

  render() {
    return (
      <Paper
        variant="outlined"
        className={this.props.classes.wrapper}
        onClick={() => {
          this.setState((prevState) => ({
            viewComments: !prevState.viewComments
          }))
        }}
      >
        <Typography component="h3">{this.props.post.title} </Typography>
        {
          !!this.props.post.comments && this.props.post.comments.length > 0 && (
            this.props.post.comments.map((comment: IPostComment, commentIndex: number) => (
              <Collapse in={this.state.viewComments} key={`post_${this.props.index}_comment_${commentIndex}`}>
                <Divider light />
                <PostComment comment={comment} />
              </Collapse>
            ))
          )
        }
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Post);