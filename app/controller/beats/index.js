var express = require('express');
var api = express.Router();

require('./beats')(api);

module.exports = api;
