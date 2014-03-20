'use strict';
/*global casper*/

casper.test.begin('profile', 2, function suite(test) {

  casper.start('http://localhost:3000/profile', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    test.assertVisible('p#name', 'full name selector is visible');
      test.assertVisible('p#email', 'email selector is visible');
  });

  casper.run(function(){
    test.done();
  });

});
