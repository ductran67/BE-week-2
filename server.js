const express = require("express");

const routes = require("./routes");

const { errorHandler } = require('./middleware/errorHandler');

const server = express();

server.use(express.json());

server.use(routes);

server.use(errorHandler);

module.exports = server;