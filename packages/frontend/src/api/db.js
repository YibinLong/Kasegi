import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAuth } from './auth';

const store = firebase.firestore();
if (process.env.NODE_ENV === 'development') {
  store.useEmulator('localhost', 8080);
}

const DBContext = React.createContext();
export function DBContextProvider(props) {
  const [ docs, setDocs ] = React.useState();
  const auth = useAuth();

  const getUser = React.useCallback(async (queryId, selector) => {
    if (!auth.current) {
      console.error('Reading data when not signed in is disallowed.');
      return undefined;
    }
    // Get my own data
    let me, user, pub, priv;
    let uid = queryId;
    if (!uid) {
      me = true;
      if (!auth.current) throw new Error('must either be signed in or give UID');
      uid = auth.current.uid;
      user = store.collection('users').doc(uid);
      pub = user.collection('public').doc(uid);
      priv = user.collection('private').doc(uid);
      if (!docs) {
        setDocs({user: user, public: pub, private: priv});
      }
    } else {
      user = store.collection('users').doc(uid);
      pub = user.collection('public').doc(uid);
      priv = user.collection('private').doc(uid);
    }

    // Only return public for uid-specific requests
    try {
      if (selector === 'public') return (await pub.get()).data();
      else if (me && selector === 'private') return (await priv.get()).data();
      else return ({
        public: (await pub.get()).data(),
        private: me ? (await pub.get()).data() : {},
      });
    } catch (e) {
      console.error('Could not get profile data for', uid, e);
      console.trace();
      return {
        public: {},
        private: {},
      }
    }
  }, [auth, docs]);

  const listPosts = React.useCallback(async (limit) => {
    if (!auth.current) throw new Error('not signed in');
    let snapshot;
    try {
      snapshot = await store.collection('posts').get();
    } catch (e) {
      console.log('could not get post data');
      return [];
    }
    const datas = [];

    // Get our data
    snapshot.forEach((doc) => datas.push(doc.data()));

    // Merge the owner's information into the response
    const posts = await Promise.all(
      datas.map(async (data) => {
        if (!data.owner) return null;
        const owner = await getUser(data.owner);
        return { ...owner, ...data }
      })
    );

    return posts.filter(post => Boolean(post));
  }, [auth, getUser]);

  return (
    <DBContext.Provider 
    value={{getUser, listPosts}} 
    children={props.children}
    />
  )
}
export function useDB() {
  return React.useContext(DBContext);
};
