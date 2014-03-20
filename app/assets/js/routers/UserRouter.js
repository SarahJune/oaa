'use strict';

var Backbone           = require('backbone');
var $                  = require('jquery');
var User               = require('../models/User');
var UserCollection     = require('../models/UserCollection');
var UserCollectionView = require('../views/UserCollectionView');
var UserProfileView    = require('../views/UserProfileView');

module.exports = Backbone.Router.extend({
  routes: {'users/:id': 'show',
           'users': 'index'},

  show: function(id){
    var user = new User({"_id": String(id)});
    user.fetch({
      reset: true,
      success: function() {
        var userProfileView = new UserProfileView({model: user});
        $('.mainContent').replaceWith(userProfileView.el);
      },
      error: function() {console.log('error')}
    });
    console.log(id);
  },

  start: function(){ //browers.js calls this (2)
    Backbone.history.start({pushState: false});
  },

  index: function(){
    this.userList.fetch();
    $('.mainContent').replaceWith(this.userListView.el);
  },

  initialize: function(){
    this.userList = new UserCollection();
    this.userListView = new UserCollectionView({collection: this.userList});
  }
});
