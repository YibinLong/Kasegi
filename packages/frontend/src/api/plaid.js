import Plaid from 'plaid';
import React, { useEffect } from 'react';
import config from '../config';
import firebase from 'firebase/app';
import 'firebase/functions';
import { request } from 'http';

const { clientID, envstring } = config.plaid;
const secret = config.plaid.secret.sandbox;

let envs = {
  'sandbox': Plaid.environments.sandbox,
  'development': Plaid.environments.development,
  'production': Plaid.environments.production,
}

const server = firebase.functions;
server().useEmulator('localhost', 5001);
const requestLinkToken = server().httpsCallable('plaid-createLinkToken');
const getAccessToken = server().httpsCallable('plaid-setAccessToken')

const BankContext = React.createContext();
export function useBank() {
  return React.useContext(BankContext);
};

export const BankContextProvider = (props) => {
  const [linkToken, setLinkToken] = React.useState();

  const accessToken = async(token, metadata) => {
    await getAccessToken({ publicToken: token, metadata })
  };

  React.useEffect(() => {
    requestLinkToken()
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status_code !== 200) {
          throw Error('Request Error: Plaid Returned', data.status_code);
        }
        setLinkToken(data.link_token);
      })
  }, []);

  return (
    <BankContext.Provider 
      value={{
        accessToken,
        linkToken,
      }} 
      children={props.children}
    />
  )
}
