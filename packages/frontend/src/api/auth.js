import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import React from 'react';

const fb = firebase.auth();
const functions = firebase.functions();
if (process.env.NODE_ENV === 'development') {
  fb.useEmulator('http://localhost:9099');
}

const serverCreateUser = functions.httpsCallable('postCreateUser');

export const auth = {

  /**
   * @param options.email required, email
   * @param options.password required, password
   * @param options.name display name
   */
  createUser: async (options) => {
    if (fb.currentUser) throw Error('Cannot create a user when signed in.');
    await serverCreateUser(options);
    await fb.signInWithEmailAndPassword(options.email, options.password);
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
  const [current, setCurrent] = React.useState();

  React.useEffect(() => {
    fb.onAuthStateChanged(user => {
      setCurrent(user);
    });
  }, [])

  return (
    <AuthContext.Provider value={{current, ...auth}}>
      {props.children}
    </AuthContext.Provider>
  )
}
