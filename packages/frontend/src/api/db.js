import firebase from 'firebase/app';

const store = firebase.firestore;
const auth = firebase.auth;

export const db = {
  listPosts: async (limit) => {
    if (!auth().currentUser) throw new Error('not signed in');
    return store().collection('posts').limit(limit).get();
  },
  createPost: async (options) => {
    if (!auth().currentUser) throw new Error('not signed in');
    const uid = auth().currentUser.uid;
    return store().collection('posts').doc().set({
      ...options,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userid: uid,
    });
  },
  getFriends: async (user) => {

  },
};
