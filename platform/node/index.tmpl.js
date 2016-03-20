/**
 * Usage
 *
 * var MailChecker = require('mailchecker/platform/node')
 * MailChecker.is_valid(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */
'use strict';

var range = require('node-range');

var blacklist        = [{{& listSTR }}];
var isValidEmail     = /{{& regexp }}/;

function all_domain_suffixes(email) {
  var domain_components = email.split('@')[1].split('.');

  return range(0, domain_components.length).map(function (n) {
    return domain_components.slice(n).join('.');
  });
}

function is_blacklisted(email) {
  function suffix_is_blacklisted(domain_suffix) {
    return blacklist.indexOf(domain_suffix) >= 0;
  }

  return all_domain_suffixes(email).some(suffix_is_blacklisted);
}

module.exports = {
  is_valid: function (email){
    if (typeof(email) !== 'string') {
      return false;
    }
    email = email.toLowerCase();
    if (!isValidEmail.test(email)) {
      return false;
    }
    return !is_blacklisted(email);
  },
  blacklist: function () {
    return blacklist;
  }
};
