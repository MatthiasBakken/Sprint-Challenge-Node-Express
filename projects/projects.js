const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

// middleware


const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post('/', (req, res) => {
  const { id } = req.params;
  const newProject = req.body;

  if (newProject.name.length < 1 || newProject.description.length < 1) {
    sendError(400, "Project is missing Name and/or Description.", res);
    return;
  } else {
    db
      .insert(newProject)
      .then(project => {
        res.json(newProject);
      })
      .catch(error => {
        sendError(500, "Something went terribly wrong!", res);
      });
  };
});

router.get('/', (req, res) => {
  db
    .get()  
    .then(projects => {
      res.json(projects);
    })
    .catch(error => {
      sendError(500, "Something went terribly wrong!", res);
    });
})

module.exports = router;