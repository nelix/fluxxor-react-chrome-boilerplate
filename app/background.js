require('./background/livereload');
var Fluxxor = require('fluxxor');

var Store = require('./stores/generic');
var app = require('./background/app');

var store = new Store();
var stores = {
  Store: store
};
var flux = new Fluxxor.Flux(stores, require('./actions'));

app(flux, 'Store');
