var express = require('express');
var api = express.Router();

require('./user')(api);

module.exports = api;
