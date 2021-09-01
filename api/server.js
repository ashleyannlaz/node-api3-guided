const express = require('express'); // importing a CommonJS module
const cors = require('cors'); // middleware we install from NPM
const morgan = require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// lets do a custom 
function logger(req, res, next) {
  console.log('logger has been invoked')
  console.log(`it is a ${req.method} request`)
  next();
}

function hailCohort(cohortName) {
  return function (req, res, next) {
    console.log(`Web ${cohortName} Rocks!`)
    next()
  }
}

server.use(express.json()); // middleware that teaches express to read json
server.use(cors()); // using some middleware
server.use(logger);
server.use(morgan('dev'));
server.use(hailCohort(45));

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

module.exports = server;
