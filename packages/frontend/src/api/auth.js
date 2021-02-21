import firebase from 'firebase/app';
import React from 'react';
import { user as remote } from './user';

const db = firebase.firestore;
const fb = firebase.auth;

export const auth = {

  /**
   * @param options.email required, email
   * @param options.password required, password
   * @param options.name display name
   */
  createUser: (options) => {
    if (fb().currentUser) throw Error('Cannot create a user when signed in.');
    const { email, password, name } = options;

    return fb().createUserWithEmailAndPassword(email, password)
      .then(() => remote.changeName(name))
  },

  /**
   * @param {string} options.email the email to sign in with
   * @param {string} options.password the password to sign in with
   */
  signIn: (options) => {
    const { email, password } = options;
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  signOut: () => {
    return firebase.auth().signOut();
  }

}
