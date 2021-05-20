import React, { Component } from 'react';

import {
  Divider,
  Collapse,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
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
  }
}

interface IState {
  viewComments: boolean;
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

        {
          !!this.props.post.comments && this.props.post.comments.length > 0 && (
            <Box
              className={this.props.classes.comments}
            >
              {
                !!this.props.post.comments && this.props.post.comments.map((comment: IPostComment, commentIndex: number) => (
                  <Collapse
                    in={this.state.viewComments}
                    key={`post_${this.props.index}_comment_${commentIndex}`}
                  >
                    <List>
                      <PostComment comment={comment} />
                      {
                        !!this.props.post.comments && commentIndex < this.props.post.comments.length - 1 && <Divider light />
                      }
                    </List>
                  </Collapse>
                ))
              }
            </Box>
          )
        }
      </ListItem>
    );
  }
}

export default withStyles(useStyles)(Post);