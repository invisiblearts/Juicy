var express = require('express');
var api = express.Router();

require('./beats')(api);
require('./user')(api);

module.exports = api;
