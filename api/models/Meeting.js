'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  starts_at: Date,
  description: String,
  comments: [{body: String, 
              author: String, 
              author_id: String, 
              created_at: Date}],
  _user: String
});

module.exports = mongoose.model('Meeting', schema);
