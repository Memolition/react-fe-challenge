import React, { Component } from 'react';
import {
  Divider,
  Collapse,
  List,
} from '@material-ui/core';

import { IPostComment } from '../store/types/posts';
import PostComment from './PostComment';

interface IProps {
  in: boolean;
  id: number;
  comments: IPostComment[];
}

class PostCommentsList extends Component<IProps> {
  render() {
    return !!this.props.comments && (
      <Collapse
        in={this.props.in}
        key={`post_${this.props.id}_comments`}
      >
        <List>
          {this.props.comments.map((comment: IPostComment, commentIndex: number) => (
            <React.Fragment key={`post_${this.props.id}_coments_${commentIndex}`}>
              <PostComment comment={comment} />
              {
                !!this.props.comments && commentIndex < this.props.comments.length - 1 && <Divider light />
              }
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    );
  }
}

export default PostCommentsList;