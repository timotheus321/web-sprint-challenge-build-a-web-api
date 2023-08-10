// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model')

router.get('/', (req, res, next) => {
    Actions.get()
      .then(actions => {
        res.json(actions || []); 
      })
      .catch(next); 
  });

  module.exports = router;