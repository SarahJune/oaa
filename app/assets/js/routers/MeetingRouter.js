'use strict';

var Backbone                 = require('backbone');
var $                        = require('jquery');
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
    var agendaItemsList = new AgendaItemCollection();

    meeting.fetch({
      error: function(model, xhr, options) {
        console.log(JSON.parse(xhr.responseText).errors);
      },
      success: function(model, response, options) {
        var meetingView = new MeetingView({model: model});
        meetingView.render();
        $('.mainContent').replaceWith(meetingView.el);

        agendaItemsList.fetch({data: {_meeting: meeting.id}},{
          success: function() {
            var agendaItemsView = new AgendaItemCollectionView({collection: agendaItemsList});
            agendaItemsView.render();
            $('.agendaItems').replaceWith(agendaItemsView.el);
          },
          error: function(model, xhr, options) {
            console.log(JSON.parse(xhr.responseText).errors);
          }
        });
      }
    });
  },

  initialize: function() {

    this.meetingList = new MeetingCollection();
    this.meetingListView = new MeetingCollectionView({collection: this.meetingList});
  }
});
