import React from 'react';
import { db } from '../../api';
import { Box } from '@material-ui/core';
import { Post } from './Post';

export const Wall = () => {
  const [ posts, setPosts ] = React.useState([]);

  React.useEffect(() => {
    db.listPosts().then(setPosts);
  }, []);

  return (
    <Box 
      display="flex"
      flexDirection="column"
    >
      {
        posts.map(post => <Post key={post.timestamp} post={post} />)
      }
    </Box>
  )
}