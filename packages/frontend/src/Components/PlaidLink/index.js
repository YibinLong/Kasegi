
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

export const PlaidLinkButton = (props) => {
  const bank = useBank();
  const classes = useStyles();

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
  if (bank.linkToken) {
    return <PlaidLink linkToken={bank.linkToken} as={StyledButton}/>
  } else {
    return <StyledButton onClick={() => {}} ready={false} />
  }
}

export const PlaidLink = (props) => {
  const { linkToken, as: Button } = props;
  const bank = useBank();

  const config = {
    token: linkToken,
    onSuccess: bank.exchangeToken,
  }

  const { open, ready, error } = usePlaidLink(config);
  return (
    <Button ready={ready} onClick={() => open()} />
  )
}