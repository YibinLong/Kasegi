
import { bank } from '../../api';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import { usePlaidLink } from 'react-plaid-link';
import React, { useEffect } from 'react';

const useStyles = makeStyles(() => ({
  button: {
    marginBottom: '1rem',
    height: '4rem',
  },
  label: {
    fontWeight: 'bold',
  }
})) 

export const PlaidLink = (props) => {

};

export const PlaidLinkButton = (props) => {
  const classes = useStyles();
  const { linkToken } = props;

  const onSuccess = React.useCallback((token, metadata) => {
    // send token to server
  }, [])

  const config = {
    token: linkToken,
    onSuccess,
  }

  const { open, ready, error } = usePlaidLink(config);
  return (
    <Button 
      classes={{
        root: classes.button,
        label: classes.label
      }}
      variant="contained" 
      color="primary"
      onClick={() => open()} 
      disabled={false}>
      Connect to your bank
    </Button>
  )
}