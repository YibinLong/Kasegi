import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import React from 'react';

const fb = firebase.auth();
const functions = firebase.functions();

const serverCreateUser = functions.httpsCallable('postCreateUser');

export const auth = {

  /**
   * @param options.email required, email
   * @param options.password required, password
   * @param options.name display name
   */
  createUser: async (options) => {
    if (fb.currentUser) throw Error('Cannot create a user when signed in.');
    const { email, password, name } = options;
    // Set up a uid for the request to the function
    await fb.signInAnonymously();
    await serverCreateUser({ name: name });
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    await auth.currentUser.linkWithCredential(credential);
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
