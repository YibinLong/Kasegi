const functions = require("firebase-functions");
const admin = require('firebase-admin');
const plaid = require('./plaid');

admin.initializeApp();

exports.postCreateUser = functions.auth.user().onCreate(user => {
  admin.firestore().collection('users').doc(user.uid).set({
    public: {},
    private: {},
  })
})

exports.plaid = plaid;