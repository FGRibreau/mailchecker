/**
 * Usage
 *
 * var MailChecker = require('mailchecker/platform/node')
 * MailChecker.isValid(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */
'use strict';

var blacklist        = new Set([{{& listSTR }}]);
var isValidEmail     = /^{{& unanchoredRegexpString }}$/;

function isBlacklisted(email) {
  var currentDomain = email.split("@")[1];
  var nextDot;

  do {
    if (blacklist.has(currentDomain)) {
      return true;
    }
  } while (
    (nextDot = currentDomain.indexOf(".")) !== -1 &&
    (currentDomain = currentDomain.slice(nextDot + 1))
  );

  return false;
}

module.exports = {
  isValid: function (email){
    if (typeof(email) !== 'string') {
      return false;
    }
    email = email.toLowerCase();
    if (!isValidEmail.test(email)) {
      return false;
    }
    return !isBlacklisted(email);
  },
  blacklist: function () {
    return blacklist;
  },
  addCustomDomains: function (domains = []) {
    domains.forEach(item => blacklist.add(item));
  }
};
