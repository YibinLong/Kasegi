import React from 'react';
import firebase from 'firebase/app';
import 'firebase/functions';
import { useDB } from './db';
import { useAuth } from './auth';

const functions = firebase.functions();
if (process.env.NODE_ENV === 'development') {
  functions.useEmulator('localhost', 5001);
}

const serverLinkToken = functions.httpsCallable('plaid-createLinkToken');
const serverAccessToken = functions.httpsCallable('plaid-setAccessToken');
const serverGetHoldings = functions.httpsCallable('plaid-getHoldings');

const BankContext = React.createContext();

export const BankContextProvider = (props) => {
  const [linkToken, setLinkToken] = React.useState();
  const [accessToken, setAccessToken] = React.useState();
  const db = useDB();
  const auth = useAuth();

  const sync = React.useCallback(async () => {
    if (auth.current) {
      const response = await serverGetHoldings();
      const data = response.data.holdings;
      const total = data.reduce((acc, val) => acc + val.institution_value, 0);
      db.createPost(`I just joined Kasegi with $${total} in savings!`)
    }
  }, [auth]);

  const requestLinkToken = React.useCallback(async () => {
    const user = await db.getUser(undefined, 'private');
    if (!user || !user.accessToken) {
      const { data } = await serverLinkToken();
      if (data.status_code !== 200) 
        throw Error('Request Error: Plaid Returned', data.status_code);
      setLinkToken(data.link_token);
    } else {
      setAccessToken(user.accessToken);
    }
  }, [db]);

  const exchangeToken = React.useCallback(async (token, metadata) => {
    const response = await serverAccessToken({ publicToken: token, metadata })
    setAccessToken(response.data.access_token);
    return sync();
  }, [sync]);

  return (
    <BankContext.Provider 
      value={{
        accessToken,
        linkToken,
        requestLinkToken,
        exchangeToken,
      }} 
      children={props.children}
    />
  )
}

export function useBank() {
  return React.useContext(BankContext);
};