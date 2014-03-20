'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'profile',

  initialize: function() {
    this.render();
  },

  render: function() {
    var userAttributes = this.model.toJSON();
    var template = require('../../templates/profile.hbs');
    this.$el.html(template(userAttributes));
    return this;
  }
});
