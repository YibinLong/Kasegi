import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';

/**
 * 
 * @param {email: String, displayName: name} param0 
 */
export const auth = {
  createUser: (options) => {
    const { email, password, ...opts } = options;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((record) => {
        record.user.updateProfile(opts);
      })
  },
}

export const useUser = () => {
  const [user, setUser] = React.useState(null);
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  })
  return user;
}
