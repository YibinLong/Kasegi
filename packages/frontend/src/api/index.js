import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from '../config';
import { auth } from './auth';
import { db } from './db';
import { user } from './user';

firebase.apps.length === 0 &&
process.env.NODE_ENV === 'production' ? 
  firebase.initializeApp() :
  firebase.initializeApp(config.firebase);

export const useUser = () => {
  const [user, setUserData] = React.useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user ?
        db.getUser().then((data) => { setUserData(data) }) :
        setUserData(false);
    })
  }, []);

  return user;
}

export { auth, db, user as remote };
