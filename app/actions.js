var Constants = require("./constants.js");

module.exports = {
  init: function() {
    this.dispatch(Constants.INIT);
  },

  add: function(what) {
    this.dispatch(Constants.ADD, what);
  }
};
