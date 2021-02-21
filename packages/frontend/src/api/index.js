import './init';
import React from 'react';
import { useAuth, AuthContextProvider } from './auth';
import { useDB, DBContextProvider } from './db';
import { user } from './user';
import { useBank, BankContextProvider } from './plaid';


export const Provider = (props) => {
  return (
    <AuthContextProvider>
      <DBContextProvider>
        <BankContextProvider children={props.children}>
        </BankContextProvider>
      </DBContextProvider>
    </AuthContextProvider>
  );
}

export { useAuth, useDB, useBank, user as remote };
