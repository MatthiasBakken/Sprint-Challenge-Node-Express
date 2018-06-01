// node modules
const express = require('express');
const cors = require('cors');

// server code
const port = 5555;
const server = express();
server.use(express.json());
// server.use(cors({ origin: "http://localhost:3001" }));

// middleware

// import sub-applications

// route handlers

server.listen(port, () => console.log(`Server is running on port ${port}`));