// node modules
const express = require('express');
const cors = require('cors');

// server code
const port = 5555;
const server = express();
server.use(express.json());
// server.use(cors({ origin: "http://localhost:3003" }));



// middleware

// import sub-applications
const actions = require('./actions/actions');
const projects = require('./projects/projects');

// route handlers
server.use('/actions', actions);
server.use('/projects', projects);

server.listen(port, () => console.log(`Server is running on port ${port}`));