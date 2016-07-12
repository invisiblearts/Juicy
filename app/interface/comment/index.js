var express = require('express');
var api = express.Router();

require('./comment')(api);

module.exports = api;
