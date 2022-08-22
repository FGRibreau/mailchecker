import re

import sys


if sys.version_info[0] >= 3:
  xrange = range


class MailChecker(object):

    blacklist = { {{& listSTR}} }
    valid_matcher = re.compile(r"\A{{& unanchoredRegexpString }}\Z")

    @classmethod
    def is_valid(cls, email):
        email = email.lower()

        return (cls.is_valid_email_format(email) and
                not cls.is_blacklisted(email))

    @classmethod
    def all_domain_suffixes(cls, email):
        domain = email.split("@")[-1]
        components = domain.split(".")

        return (".".join(components[n:]) for n in xrange(0, len(components)))

    @classmethod
    def is_blacklisted(cls, email):
        all_domain_suffixes = cls.all_domain_suffixes(email)
        return any(domain in cls.blacklist for domain in all_domain_suffixes)

    @classmethod
    def is_valid_email_format(cls, email):
        return bool(email) and cls.valid_matcher.search(email) is not None

    @classmethod
    def add_custom_domains(cls, domains = []):
        cls.blacklist.update(domains)
