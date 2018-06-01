const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

// middleware


const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

module.exports = router;