import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAuth } from './auth';

const store = firebase.firestore();

const DBContext = React.createContext();
export function DBContextProvider(props) {
  const [ docs, setDocs ] = React.useState();
  const auth = useAuth();

  const getUser = React.useCallback(async (uid, selector) => {
    // Get my own data
    let user, pub, priv;
    if (!uid) {
      if (!auth.current) throw new Error('must either be signed in or give UID');
      let id = auth.current.uid;
      user = store.collection('users').doc(id);
      pub = user.collection('public').doc(id);
      priv = user.collection('private').doc(id);
      if (!docs) {
        setDocs({user: user, public: pub, private: priv});
      }
    } else {
      user = store.collection('users').doc(uid);
      pub = user.collection('public').doc(uid);
      priv = user.collection('private').doc(uid);
    }
    if (selector === 'private') return (await priv.get()).data();
    if (selector === 'public') return (await pub.get()).data();
    else return ({
      ...(await user.get()).data(),
      public: (await pub.get()).data(),
      private: (await priv.get()).data(), 
    });
  }, [auth, docs]);

  const listPosts = React.useCallback(async (limit) => {
    if (!auth.current) throw new Error('not signed in');
    const snapshot = await store.collection('posts').get();
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

  const [ value ] = React.useState({getUser, listPosts});

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
