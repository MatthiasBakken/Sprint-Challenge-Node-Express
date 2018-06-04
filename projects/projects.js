const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

// middleware


const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post('/', (req, res) => {
  const newProject = req.body;

  if (!newProject.name ||
    !newProject.description ||
    newProject.name.length < 1 ||
    newProject.description.length < 1) {
    sendError(400, "Project is missing Name and/or Description.", res);
    return;
  } else {
    db
      .insert(newProject)
      .then(project => {
        res.status(201).json(newProject);
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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      sendError(404, "Project for given ID not found.", res);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const updatedProject = { name, description, completed };

  if (!name || !description) {
    sendError(404, "Missing name and/or description.", res);
    return;
  } else {
    db
      .update(id, updatedProject)
      .then(update => {
        res.json(update);
      })
      .catch(error => {
        sendError(500, "Something went terribly wrong!", res);
      });
  };
});

module.exports = router;