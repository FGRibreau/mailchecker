import re

class MailChecker(object):

    def __init__(self):
        self.blacklist = set([{{& listSTR}}])
        self.valid_matcher = re.compile(r"{{& regexp}}")

    def is_valid(self, email):
        email = email.lower().strip()

        return (self.is_valid_email_format(email) and
                not self.is_blacklisted(email))

    def all_domain_suffixes(self, email):
        domain = email.split("@")[-1]
        components = domain.split(".")

        return (".".join(components[n:]) for n in xrange(0, len(components)))

    def is_blacklisted(self, email):
        all_domain_suffixes = self.all_domain_suffixes(email)
        return any(domain in self.blacklist for domain in all_domain_suffixes)

    def is_valid_email_format(self, email):
        return bool(email) and self.valid_matcher.search(email) is not None
