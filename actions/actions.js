const express = require('express');

const db = require('../data/helpers/actionModel');

const router = express.Router();

// middleware


const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.get('/', (req, res) => {
  db
    .get()  
    .then(actions => {
      res.json(actions);
    })
    .catch(error => {
      sendError(500, "Something went terribly wrong!", res);
    });
})

module.exports = router;