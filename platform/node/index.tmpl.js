/**
 * Usage
 *
 * var MailChecker = require('mailchecker/platform/node')
 * MailChecker(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */

var lists            = {{& listJSON }};
var isValidEmail     = {{& regexp }};
var isThrowableEmail = new RegExp(lists.map(function(m) { return '\\b' + m + '$'; }).join('|'));

module.exports = function MailChecker(email){
  if(!isValidEmail.test(email)){return false;}
  return !isThrowableEmail.test(email);
};
