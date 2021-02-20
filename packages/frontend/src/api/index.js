import firebase from 'firebase/app';
import config from '../config';
import { auth, useUser } from './auth';
import { db } from './db';

if (firebase.apps.length === 0) {
  if (process.env.NODE_ENV === 'production') {
    firebase.initializeApp();
  } else {
    firebase.initializeApp(config.firebase);
  }
}

export { auth, db, useUser };
