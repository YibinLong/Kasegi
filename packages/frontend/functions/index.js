const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const plaid = require('./plaid');

exports.postCreateUser = functions.auth.user().onCreate(user => {
  admin.firestore().collection('users').doc(user.uid).set({
    public: {},
    private: {},
  })
})

exports.plaid = plaid;