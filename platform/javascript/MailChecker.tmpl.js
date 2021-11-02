/**
 * MailChecker.isValid(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 *
 * Usage
 *
 * <script type="text/javascript" src="mailchecker/platform/javascript/mailchecker.js"></script>
 * <script type="text/javascript">
 *   alert(MailChecker.isValid("plop@plop.33mail.com"));
 * </script>
 */

(function(global){
  var isValidEmail     = /^{{& unanchoredRegexpString }}$/;
  var blacklist        = [{{& listSTR }}];

  function mapRange(start, endExclusive, f) {
    var arr = []

    for (var i = start; i < endExclusive; i++) {
      arr.push(f(i))
    }

    return arr;
  }

  function allDomainSuffixes(email) {
    var domainComponents = email.split('@')[1].split('.');

    return mapRange(0, domainComponents.length, function (n) {
      return domainComponents.slice(n).join('.');
    });
  }

  function isBlacklisted(email) {
    return allDomainSuffixes(email).some(function (domainSuffix) {
      return blacklist.indexOf(domainSuffix) >= 0;
    });
  };

  global.MailChecker = {
    isValid: function (email){
      email = email.toLowerCase();
      if(!isValidEmail.test(email)){return false;}
      return !isBlacklisted(email);
    },
    blacklist: function () {
      return blacklist;
    },
    addCustomDomains: function (domains = []) {
      blacklist.push(...domains)
    }
  };
})(window);

