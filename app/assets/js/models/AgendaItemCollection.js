'use strict';

var Backbone   = require('backbone');
//var Meeting    = require('./Meeting');
var AgendaItem = require('./AgendaItem');

module.exports = Backbone.Collection.extend({
  model: AgendaItem,
  url: 'http://localhost:3000/api/v1/agenda_items'
});
