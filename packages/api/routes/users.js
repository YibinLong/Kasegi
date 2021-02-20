const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const UserModel = require('../models/user');

/* GET users listing. */
router.post('/create', async (req, res, next) => {
  UserModel.create(req.body)
      .then(() => {
        res.status(201).send({message: 'Account successfully created'});
      })
      .catch((err) => res.status(500).send(err.errorInfo));
});

module.exports = router;
