import re

class MailChecker(object):

    def __init__(self):
        self.list_string = """{{list}}"""

        # valid email format regex source: https://gist.github.com/dideler/5219706
        self.email_regex = """([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`"
                    "{|}~-]+)*(@|\sat\s)(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(\.|"
                    "\sdot\s))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)"""
        self.fake_matcher = re.compile('|'.join(map(lambda x: '\\b' + x.lower() + '$', self.list_string.split(","))))
        self.valid_matcher = re.compile(self.email_regex)

    def is_valid(self, email):
        email = email.lower()
        return self.is_valid_email_format(email) and self.fake_matcher.search(email) == None

    def is_valid_email_format(self, email):
        if email and email != '':
            return self.valid_matcher.search(email) != None
        else:
            return False