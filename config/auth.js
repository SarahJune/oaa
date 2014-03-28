'use strict';
var os = require('os');

// expose our config directly to our application using module.exports
module.exports = {

  'twitterAuth' : {
    'consumerKey'     : process.env.TWITTER_CONSUMER_KEY,
    'consumerSecret'  : process.env.TWITTER_CONSUMER_SECRET,
    'callbackURL'     : 'http://' + os.hostname() + '/auth/twitter/callback'
  }

};
