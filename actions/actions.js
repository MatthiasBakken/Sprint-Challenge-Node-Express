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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db
    .get(id)
    .then(action => {
      // console.log(action.description);
      // console.log(action.notes);
      res.json(action);
    })
    .catch(error => {
      sendError(404, "Action for given ID not found.", res);
    });
})
module.exports = router;