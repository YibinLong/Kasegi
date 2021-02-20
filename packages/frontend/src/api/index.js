import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from '../config';
import { auth, useUser } from './auth';
import { db } from './db';
import { user } from './user';

firebase.apps.length === 0 &&
process.env.NODE_ENV === 'production' ? 
  firebase.initializeApp() :
  firebase.initializeApp(config.firebase);

export { auth, db, user as remote, useUser };
