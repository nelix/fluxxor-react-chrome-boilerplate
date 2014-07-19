var Fluxxor = require('fluxxor');
var Constants = require('../constants.js');


var Store = Fluxxor.createStore({
  models: [],
  initialize: function() {
    this.bindActions(
      Constants.ADD, this.handleAdd,
      Constants.INIT, this.handleInit
    );
  },

  handleInit:function() {
    this.emit('change');
  },

  handleAdd: function(payload) {
    this.models.push(payload);
    this.emit('change');
  },

  getState: function(url) {
    return this.models;
  }
});

module.exports = Store;
