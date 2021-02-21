import firebase from 'firebase/app';

const store = firebase.firestore;
const auth = firebase.auth;

export const db = {
  async listPosts(limit) {
    if (!auth().currentUser) throw new Error('not signed in');
    const snapshot = await store().collection('posts').get()
    const datas = [];
    snapshot.forEach((doc) => datas.push(doc.data()));
    const posts = await Promise.all(
      datas.map(async (data) => {
        if (!data.owner) return null;
        return { ...data, ...await this.getUser(data.owner) }
      })
    );
    return posts.filter(post => Boolean(post));
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
  getUser: async (userid) => {
    let getPrivate = !Boolean(userid); // If not given a user, try to get the current user
    let uid;
    if (getPrivate) {
      if (!auth().currentUser) throw new Error('not signed in');
      uid = await auth().currentUser.uid;
    } else {
      uid = userid;
    }

    let data = {uid: uid};
    const pubDoc = await store().collection('users').doc(uid).collection('public').doc(uid).get();
    data = { ...data, ...await pubDoc.data()};
    if (getPrivate) {
      const privDoc = await store().collection('users').doc(uid)
        .collection('private').doc(uid).get();
      data = { ...data, ...await privDoc.data()};
    }
    return data;
  }
};
