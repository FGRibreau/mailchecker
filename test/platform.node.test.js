var _ = require('lodash');
var t = require('assert');
var MailChecker = null;

suite('Node', function () {
  setup(function () {
    MailChecker = require('../platform/node');
  });

  function _is(b, email) {
    t.equal(MailChecker.is_valid(email), b, "MailChecker.is_valid(" + email + ") === " + b);
  }
  var isValid = _is.bind(this, true);
  var isInvalid = _is.bind(this, false);


  suite('.isValid', function () {
    test('should return true if the email is valid', function () {
      isValid("plop@plop.com");
      isValid("my.ok@ok.plop.com");
      isValid("my+ok@ok.plop.com");
      isValid("my=ok@ok.plop.com");
      isValid("ok@gmail.com");
      isValid("ok@hotmail.com");
    });

    test('should return false if the email is invalid', function () {
      isInvalid(undefined);
      isInvalid("plopplop.com");
      isInvalid("my+ok@ok=plop.com");
      isInvalid("my,ok@ok.plop.com");
      isInvalid("ok@tmail.com");
      isInvalid("plop@yopmail.pp.ua");
    });

    test('should return false if the email come from a throwable domain', function () {
      isInvalid("ok@33mail.com");
      isInvalid("ok@ok.33mail.com");
      isInvalid("ok@guerrillamailblock.com");
    });

    test("should return false if the email is from a blacklisted domain", function () {
      MailChecker.blacklist().forEach(function (domain) {
        isInvalid("test@" + domain);
        isInvalid("test@subdomain." + domain);
        isValid("test@" + domain + ".gmail.com");
      });
    });

  });

});
