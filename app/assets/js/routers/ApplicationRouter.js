'use strict';

var Backbone      = require('backbone');
var MeetingRouter = require('./MeetingRouter');
var UserRouter    = require('./UserRouter');

module.exports = Backbone.Router.extend({
  start:function() {
    Backbone.history.start({pushState: false});
  },

  initialize: function() {
    this.userRouter = new UserRouter();
    this.meetingRouter = new MeetingRouter();
  }
});
