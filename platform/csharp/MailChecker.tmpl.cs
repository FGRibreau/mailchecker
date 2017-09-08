using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace MailChecker
{
    public static class MailChecker
    {
        private static readonly Regex EmailValidator = new Regex({{&unanchoredRegexpString}});
        private static readonly string[] Blacklist = {{{&listSTR}}};
		
        public static bool IsValid(string email)
        {
            email = email.ToLower();
            return EmailValidator.IsMatch(email) && !IsBlacklisted(email);
        }

        private static bool IsBlacklisted(string email)
        {
            return AllDomainSuffixes(email).Any(Blacklist.Contains);
        }

        private static IEnumerable<string> AllDomainSuffixes(string email)
        {
            var domainComponents = email.Split('@')[1].Split('.');

            string tmpDomain = null;
            return domainComponents.Reverse().Select(domain => tmpDomain = tmpDomain != null ? String.Join(".", domain, tmpDomain) : domain);
        }
    }
}