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

const BankContext = React.createContext();

export const BankContextProvider = (props) => {
  const [linkToken, setLinkToken] = React.useState();
  const [accessToken, setAccessToken] = React.useState();
  const db = useDB();
  const auth = useAuth();

  React.useEffect(() => {
    if (auth.current) {
      (async () => {
        const user = await db.getUser(undefined, 'private');
        if (!user || !user.accessToken) {
          const { data } = await serverLinkToken();
          console.log(data);
          if (data.status_code !== 200) 
            throw Error('Request Error: Plaid Returned', data.status_code);
          setLinkToken(data.link_token);
        } else {
          setAccessToken(user.accessToken);
        }
      })();
    }
  }, [auth, db]);

  const exchangeToken = React.useCallback(async (token, metadata) => {
    const response = await serverAccessToken({ publicToken: token, metadata })
    setAccessToken(response.data.access_token);
  }, []);

  return (
    <BankContext.Provider 
      value={{
        accessToken,
        linkToken,
        exchangeToken,
      }} 
      children={props.children}
    />
  )
}

export function useBank() {
  return React.useContext(BankContext);
};