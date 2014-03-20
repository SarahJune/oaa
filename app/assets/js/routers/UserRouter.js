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
    var user = new User({"_id": String(id)}); //is assigning id, not finding =?
    //console.log(this.user.first_name);
    user.fetch({
      reset: true,
      success: function() {
        console.log(user.first_name);
        var userProfileView = new UserProfileView({model: user});
        $('.mainContent').replaceWith(userProfileView.el);  //make a new view
        console.log('hello')
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

  initialize: function(){ //when browser.js creates a new UserRoutes (1)
    this.userList = new UserCollection();
    this.userListView = new UserCollectionView({collection: this.userList});
  }
});
