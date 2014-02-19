/**
 * MailChecker(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 *
 * Usage
 *
 * <script type="text/javascript" src="mailchecker/platform/javascript/mailchecker.js"></script>
 * <script type="text/javascript">
 *   alert(MailChecker("plop@plop.33mail.com"));
 * </script>
 */

(function(global){
  var isValidEmail     = {{& regexp }};
  var isThrowableEmail = new RegExp({{& listJSON }}.map(function(m) { return '\\b' + m + '$'; }).join('|'));


  global.MailChecker = function(email){
    if(!isValidEmail.test(email)){return false;}
    return !isThrowableEmail.test(email);
  };
})(window);

