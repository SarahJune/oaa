'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  starts_at: Date,
  description: String,
  // embedded model for comments - because it's only referenced by meetings
  comments: [{body: String,
              author: String,
              author_id: String,
              created_at: Date}],
  _user: {type: String, ref: 'User'}
});

module.exports = mongoose.model('Meeting', schema);
