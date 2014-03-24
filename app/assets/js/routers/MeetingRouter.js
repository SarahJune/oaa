'use strict';

var Backbone                 = require('backbone');
var $                        = require('jquery');
var async                    = require('async');
var Meeting                  = require('../models/Meeting');
var MeetingCollection        = require('../models/MeetingCollection');
var MeetingView              = require('../views/MeetingView');
var MeetingCollectionView    = require('../views/MeetingCollectionView');
var MeetingForm              = require('../views/MeetingForm');
var AgendaItemView           = require('../views/AgendaItemView');
var AgendaItemCollection     = require('../models/AgendaItemCollection');
var AgendaItemCollectionView = require('../views/AgendaItemCollectionView');

module.exports = Backbone.Router.extend({
  routes: {'meetings' : 'index',
           'meetings/new' : 'create',
           'meetings/:id' : 'show'},

  start: function() {
    Backbone.history.start({pushState: false});
  },

  index: function() {
    this.meetingList.fetch();
    $('.mainContent').replaceWith(this.meetingListView.el);
  },

  create: function() {
    var meetingForm = new MeetingForm({model: new Meeting});
    $('.mainContent').replaceWith(meetingForm.el);
  },

  show: function(id) {
    var meeting = new Meeting({id: id});
    var meetingView = new MeetingView({model: meeting});
    var agendaItemsList = new AgendaItemCollection();
    var meetingData = null;
    var agendaItemData = null;

    async.parallel(
      [
        // Meeting Model fetch
        function (callback)
        {
          meeting.fetch({
            error: function(model, xhr, options) {
              callback(JSON.parse(xhr.responseText).errors);
            },
            success: function(model, response, options) {
              meetingData = model;
              callback(null, meetingData);
            }
          );
        },
        // Agenda Items Model fetch
        function (callback)
        {
          agendaItemsList.fetch({
            success: function(model, response, options) {
              callback();
            },
            error: function(model, xhr, options) {
              callback(JSON.parse(xhr.responseText).errors);
            }
          });
        }
      ],
      // Once everything has completed, do this...
      function (error, result)
      {
        var meetingView = new MeetingView({model: meetingData});
        meetingView.render();
        $('.mainContent').replaceWith(meetingView.el);

        var agendaItemsView = new AgendaItemCollectionView({collection: agendaItemsList});
        agendaItemsView.belongsToMeeting(id);
        $('.agendaItems').replaceWith(agendaItemsView.el);
      }
    );
  },

  initialize: function() {
    this.meetingList = new MeetingCollection();
    this.meetingListView = new MeetingCollectionView({collection: this.meetingList});
  }
});
