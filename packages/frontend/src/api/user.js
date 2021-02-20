import firebase from 'firebase/app';

const db = firebase.firestore;
const auth = firebase.auth;

export const user = {
  
  /**
   * 
   * @param {*} uid 
   */
  search(name) {
    return db().collection('users')
      .where('name_lower', '>=', name)
      .where('name_lower', '<=', name+ '\uf8ff')
      .get();
  },

  get(uid) {
    return db().collection('users').where('owner', '==', 'uid');
  },

  changeName(name) {
    if (!auth().currentUser) throw Error('not signed in');
    const uid = auth().currentUser.uid;
    console.log(uid);
    return db().collection('users').doc(uid)
      .collection('public').doc(uid)
      .set({
        name: name,
        name_lower: name.toLowerCase(),
      });
  },
}