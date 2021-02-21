import React, { useEffect } from 'react';
import { useDB, useAuth, useBank } from '../../api';
import { Box, Button, TextField, makeStyles } from '@material-ui/core';
import { Post } from './Post';
import { PlaidLinkButton } from '../PlaidLink';
import { BankContextProvider } from '../../api/plaid';

const useStyles = makeStyles(() => ({
  button: {
    marginBottom: '1rem',
    height: '3rem',
    width: '6rem',

  },
  label: {
    fontWeight: 'bold',
  }
})) 

export const Wall = () => {
  const [ message, setMessage ] = React.useState('');
  const db = useDB();
  const auth = useAuth();
  const bank = useBank();
  const classes = useStyles();

  useEffect(() => {
    db.listPosts();
    bank.requestLinkToken();
  }, []);

  const handleGeneratePost = React.useCallback(() => {
    if (auth.current) {
      db.createPost(message);
    }
  }, [auth, db, message]);

  return (
    <Box 
      display="flex"
      flexDirection="column"
    >
      {!bank.accessToken && <PlaidLinkButton />}
      <Box display="flex" alignItems="stretch">
        <TextField 
          style={{flexGrow: 1, margin: '0 1rem'}} 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Test Messages Here..."
        />
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleGeneratePost}
          classes={{root: classes.button, label: classes.label}}
        >
          Generate Post
        </Button>
      </Box>
      {
        db.posts.map(post => <Post key={post.timestamp} post={post} />)
      }
    </Box>
  )
}