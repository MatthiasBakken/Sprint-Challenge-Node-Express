const express = require('express');

const db = require('../data/helpers/actionModel');

const router = express.Router();

// middleware


const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post('/', (req, res) => {
  const { completed, description, notes, project_id } = req.body;
  const newAction = { completed, description, notes, project_id };

  if (!newAction.description ||
    !newAction.notes ||
    !project_id ||
    newAction.description.length < 1 ||
    newAction.notes.length < 1) {
    sendError(400, "Action is missing project ID, description and/or notes.", res);
    return;
  } else {
    db
      .insert(newAction)
      .then(action => {
        res.status(201).json(newAction);
      })
      .catch(error => {
        sendError(500, "Something went terribly wrong!", res);
      });
  };
});

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
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, notes, description, completed } = req.body;
  const updatedAction = { project_id, notes, description, completed };

  if (!notes || !description || !project_id) {
    sendError(404, "Missing project ID, name and/or description.", res);
    return;
  } else {
    db
      .update(id, updatedAction)
      .then(update => {
        res.json(updatedAction);
      })
      .catch(error => {
        sendError(500, "Something went terribly wrong!", res);
      });
  };
});

module.exports = router;