const functions = require('firebase-functions');
const admin = require('firebase-admin');
const plaid = require('plaid');

const map = {
  'sandbox': plaid.environments.sandbox,
}

const plaidClient = new plaid.Client({
  clientID: functions.config().plaid.client_id,
  secret: functions.config().plaid.secret,
  env: map[functions.config().plaid.environment],
  options: {
    version: '2020-09-14',
  }
});


exports.createLinkToken = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid) return { ok: false, message: 'needs-auth' };
  functions.logger.info(`${uid} created a link token`, { structuredData: true});

  const configs = {
    user: {
      client_user_id: uid,
    },
    client_name: 'Kasegi',
    products: ['investments'],
    country_codes: ['US'],
    language: 'en',
    redirect_uri: process.env.PLAID_REDIRECT_URI,
  }

  return new Promise((resolve, reject) => {
    plaidClient.createLinkToken(configs, (err, response) => {
      if (err) reject({error: err });
      resolve(response);
    })
  });
})

exports.setAccessToken = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  return new Promise((resolve, reject) => {
    plaidClient.exchangePublicToken(data.publicToken, (err, tres) => {
      if (err != null) { 
        functions.logger.info(tres, { structuredData: true});
        return reject(err); 
      }
      functions.logger.info(tres, { structuredData: true});
      const userRef = admin.firestore().collection('users').doc(uid);
      const privateRef = userRef.collection('private').doc(uid);
      privateRef.set({
        itemID: tres.item_id,
        access_token: tres.access_token,
        publicToken: data.publicToken,
        metadata: data.metadata,
      }, { merge: true })
        .then(() => resolve({access_token: data.publicToken, ITEM_ID: tres.item_id}))
    });
  });
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })