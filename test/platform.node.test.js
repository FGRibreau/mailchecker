var _   = require('lodash');
var t   = require('assert');
var MailChecker = null;

suite('Node', function(){
  setup(function(){
    MailChecker = require('../platform/node');
  });

  suite('.isValid', function(){
    test('should return true if the email is valid', function(){
      // MailChecker.isValid
      // t.ok(_.isArray(loader.getLists()));
    });

    // test('should return an array of array', function(){
    //   loader.getLists().forEach(function(v, i){
    //     t.ok(_.isArray(v), "index "+i);
    //   });
    // });
  });

});
