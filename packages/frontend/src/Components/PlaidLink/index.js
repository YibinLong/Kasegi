
import { useBank } from '../../api';
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

export const PlaidLinkWrapper = (props) => {

}

export const PlaidLinkButton = (props) => {
  const classes = useStyles();
  const bank = useBank();
  const { linkToken } = props;

  const onSuccess = React.useCallback((token, metadata) => {
    // send token to server
  }, [])

  const config = {
    token: linkToken,
    onSuccess,
  }

  const StyledButton = (props) => (
    <Button 
      classes={{
        root: classes.button,
        label: classes.label
      }}
      variant="contained" 
      color="primary"
      onClick={props.onClick} 
      disabled={!props.ready}>
      Connect to your bank
    </Button>
  )

  const { open, ready, error } = usePlaidLink(config);

  if (!linkToken) return <StyledButton ready={false}/>
  return (
    <StyledButton ready={ready} onClick={() => open()} />
  )
}