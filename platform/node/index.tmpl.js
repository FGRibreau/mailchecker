/**
 * Usage
 *
 * var MailChecker = require('mailchecker/platform/node')
 * MailChecker.isValid(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */
'use strict';

var range = require('node-range');

var blacklist        = new Set([{{& listSTR }}]);
var isValidEmail     = /^{{& unanchoredRegexpString }}$/;

function allDomainSuffixes(email) {
  var domainComponents = email.split('@')[1].split('.');

  return range(0, domainComponents.length).map(function (n) {
    return domainComponents.slice(n).join('.');
  });
}

function isBlacklisted(email) {
  function suffixIsBlacklisted(domainSuffix) {
    return blacklist.has(domainSuffix);
  }

  return allDomainSuffixes(email).some(suffixIsBlacklisted);
};

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
