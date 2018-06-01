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
const actionModel = require('./actions/actionModel');
const projectModel = require('./projects/projectModel');

// route handlers
server.use('/actions', actionModel);
server.use('/projects', projectModel);

server.listen(port, () => console.log(`Server is running on port ${port}`));