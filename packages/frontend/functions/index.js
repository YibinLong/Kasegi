const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const plaid = require('./plaid');
const store = admin.firestore();
const auth = admin.auth();

exports.postCreateUser = functions.https.onCall((data, context) => {
  return new Promise(async (resolve, reject) => {
    console.log('?');
    let user;
    try {
      user = await auth.createUser({
        email: data.email,
        password: data.password,
        displayName: data.name,
      });
    } catch (e) {
      const { message } = e.errorInfo;
      return reject(new functions.https.HttpsError('invalid-argument', message));
    }

    const doc = store.collection('users').doc(user.uid);
    const pub = doc.collection('public').doc(user.uid);
    const priv = doc.collection('private').doc(user.uid);
    await pub.set({ name: data.name, name_lower: data.name.toLowerCase() });
    await priv.set({ email: data.email });
    resolve(user.toJSON());
  });
})

exports.plaid = plaid;