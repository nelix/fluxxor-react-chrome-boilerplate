/**
 * @jsx React.DOM
 */

var DOM = require('domquery');
var React = require('react/addons');
var Frame = require('jsx!react-frame-component');

require('style-loader!css-loader!sass-loader!./app.scss');
var iframeStyles = require('css!sass!./iframe.scss');

var EMBED_CLASSNAME = 'embed-wrapper';
var RESET_CLASSNAME = 'embed-reset';


var List = React.createClass({
  handleClick: function(e) {
    this.props.actions.add(prompt('what name'));
    return false;
  },

  render: function() {
    return (
      <div className="List">
        <button onClick={this.handleClick}>Add</button>
        <ul>
          {this.props.list.map(
            function(item) {
              return <li>{item}</li>;
            }
          )}
        </ul>
    </div>
    );
  }
});


var App = React.createClass({

  getInitialState: function() {
    return {
      mode: 'OPEN'
    };
  },

  getWrapperClasses: function() {
    var cx = React.addons.classSet;

    var classes = {
      'embed-wrapper': true,
      'embed-reset': true,
      'mode-list': this.state.mode === 'OPEN'
    };

    return cx(classes);
  },

  render: function() {
    return (
      <div onClick={this.handleClick} className={this.getWrapperClasses()}>
        <Frame head={<style>{iframeStyles}</style>}>
          {this.state.mode === 'OPEN' &&
            <List actions={this.props.actions} list={this.props.list || []}/>
          }
        </Frame>
      </div>
    );
  }
});


var AppWrap = function(initialState, actions) {
  var app = {
    initialize: function() {
     this._layer = DOM('<div class="{className}"></div>', {className: RESET_CLASSNAME})[0];
     DOM('body').add(this._layer);
     this.update(initialState);
     return this;
    },

    update: function(state) {
      React.renderComponent(<App actions={actions} list={state}/>, this._layer);
    }
  }

  return app.initialize();
};

module.exports = AppWrap;
