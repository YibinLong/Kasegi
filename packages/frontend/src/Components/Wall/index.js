import React from 'react';
import { db } from '../../api';
import { Box } from '@material-ui/core';
import { Post } from './Post';
import { PlaidLinkButton } from '../PlaidLink';

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
      <PlaidLinkButton />
      {
        posts.map(post => <Post key={post.timestamp} post={post} />)
      }
    </Box>
  )
}