const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
  });
  server.use((err, req, res, next) => {
    console.error(err.stack); // Log the stack trace
    res.status(500).send('Something broke!');
  });
  
      
module.exports = server;
