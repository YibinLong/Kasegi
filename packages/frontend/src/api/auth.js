import 'firebase/auth';
import firebase from 'firebase/app';

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
