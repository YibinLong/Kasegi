import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import React from 'react';
import { user as remote } from './user';
import { db } from './db';

const fb = firebase.auth();


export const auth = {

  /**
   * @param options.email required, email
   * @param options.password required, password
   * @param options.name display name
   */
  createUser: (options) => {
    if (fb.currentUser) throw Error('Cannot create a user when signed in.');
    const { email, password, name } = options;

    return fb.createUserWithEmailAndPassword(email, password)
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

const AuthContext = React.createContext(undefined);

export function useAuth() {
  return React.useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const [value, setValue] = React.useState(auth)


  React.useEffect(() => {
    fb.onAuthStateChanged(user => {
      user ? db.getUser().then((data) => { 
        setValue(old => ({...old, current: data}));
      }) :
        setValue(old => ({...old, current: false}));
    });

  }, [firebase])

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
