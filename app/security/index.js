'use strict';

var express = require('express');

function Security(app) {
  if (process.env.NODE_ENV === 'TEST' ||
   process.env.NODE_ENV === 'COVERAGE' ||
   process.env.TRAVIS == 'true' ) {
    return;
  }
  app.use(express.csrf());

}

module.exports = Security;
