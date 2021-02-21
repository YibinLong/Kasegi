import firebase from 'firebase/app';
import config from '../config';

process.env.NODE_ENV === 'production' ? 
  firebase.initializeApp() :
  firebase.initializeApp(config.firebase);