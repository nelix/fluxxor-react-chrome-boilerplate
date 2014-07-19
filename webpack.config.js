'use strict';

module.exports = {
  context: __dirname + '/app',

  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },

  cache: true,

  entry: {
    background: './background.js',
    content: './content.js'
  },

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],

    loaders: [
      { test: /\.css$/,        loader: 'style!css' },
      { test: /\.svg$/,        loader: "url?prefix=img/&limit=5000&mimetype=image/svg+xml" },
      { test: /\.gif/,         loader: 'url-loader?limit=10000&minetype=image/gif' },
      { test: /\.jpg/,         loader: 'url-loader?limit=10000&minetype=image/jpg' },
      { test: /\.png/,         loader: 'url-loader?limit=10000&minetype=image/png' },
      { test: /\.jsx$/,        loader: 'jsx-loader'}
    ]
  }
};
