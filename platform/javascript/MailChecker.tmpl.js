/**
 * MailChecker.is_valid(String email);
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
  var blacklist        = [{{& listSTR }}];

  function mapRange(start, endExclusive, f) {
    var arr = []

    for (var i = start; i < endExclusive; i++) {
      arr.push(f(i))
    }

    return arr;
  }

  function all_domain_suffixes(email) {
    var domain_components = email.split('@')[1].split('.');

    return mapRange(0, domain_components.length, function (n) {
      return domain_components.slice(n).join('.');
    });
  }

  function is_blacklisted(email) {
    return all_domain_suffixes(email).some(function (domain_suffix) {
      return blacklist.indexOf(domain_suffix) >= 0;
    });
  };

  global.MailChecker = {
    is_valid: function (email){
      if(!isValidEmail.test(email)){return false;}
      return !is_blacklisted(email);
    },
    blacklist: function () {
      return blacklist;
    }
  };
})(window);

