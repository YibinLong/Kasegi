const admin = require('firebase-admin');
// const config = require('../config').firebase;
module.exports = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
}).auth();
