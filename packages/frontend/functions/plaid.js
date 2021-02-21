const functions = require('firebase-functions');
const plaid = require('plaid');

const map = {
  'sandbox': plaid.environments.sandbox,
}

const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: map[process.env.PLAID_ENV],
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

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });