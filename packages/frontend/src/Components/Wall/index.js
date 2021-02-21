import React from 'react';
import { useDB } from '../../api';
import { Box } from '@material-ui/core';
import { Post } from './Post';
import { PlaidLinkButton } from '../PlaidLink';

export const Wall = () => {
  const [ posts, setPosts ] = React.useState([]);
  const db = useDB();

  React.useEffect(() => {
    db.listPosts().then(setPosts);
  }, [db]);

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