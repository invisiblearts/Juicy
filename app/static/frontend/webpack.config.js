var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  entry: {
    'index': 'app/beats/beats.controller.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new ngAnnotatePlugin({
      add: true,
      // other ng-annotate options here
    })
  ]
};