'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  body: String,
  comments: [{body: String, user_id: String, created_at: Date}],
  _meeting: String,
  _user: String
});

module.exports = mongoose.model('AgendaItem', schema);

