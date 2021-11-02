# Run tests from the repository root directory:
# $ python test/platform.python.test.py

# compatibility with both Python 2.x and 3.x
from __future__ import print_function

# for testing only; add the python MailChecker to the system path
import os, sys
sys.path.insert(0, 'platform/python/')

from MailChecker import MailChecker
import unittest

class TestMailCheckerIsValid(unittest.TestCase):
  def assert_is_valid_result(self, expected_valid, email):
      self.assertEqual(MailChecker.is_valid(email), expected_valid)

  def valid(self, email):
      self.assert_is_valid_result(True, email)

  def invalid(self, email):
      self.assert_is_valid_result(False, email)

  def test_return_true_if_valid(self):
    self.valid("plop@plop.com")
    self.valid("my.ok@ok.plop.com")
    self.valid("my+ok@ok.plop.com")
    self.valid("my=ok@ok.plop.com")
    self.valid("ok@gmail.com")
    self.valid("ok@hotmail.com")

  def test_return_false_if_email_invalid(self):
    self.invalid("")
    self.invalid(" ")
    self.invalid("plopplop.com")
    self.invalid("my+ok@ok=plop.com")
    self.invalid("my,ok@ok.plop.com")
    self.invalid("  ok@gmail.com  ")
    self.invalid("  ok@gmail.com")
    self.invalid("ok@gmail.com  ")
    self.invalid("\nok@gmail.com\n")
    self.invalid("\nok@gmail.com")
    self.invalid("ok@gmail.com\n")

  def test_return_false_if_throwable_domain(self):
    self.invalid("ok@tmail.com")
    self.invalid("ok@33mail.com")
    self.invalid("ok@ok.33mail.com")
    self.invalid("ok@guerrillamailblock.com")

  def test_return_false_for_blacklisted_domains_and_their_subdomains(self):
    for blacklisted_domain in MailChecker.blacklist:
      self.invalid("test@" + blacklisted_domain)
      self.invalid("test@subdomain." + blacklisted_domain)
      # Should not be invalid as a subdomain of a valid domain.
      self.valid("test@%s.gmail.com" % blacklisted_domain)

  def test_add_custom_domains(self):
    self.valid('foo@youtube.com')
    self.valid('foo@google.com')
    self.valid('ok@gmail.com')

    MailChecker.add_custom_domains(['youtube.com', 'google.com'])

    self.invalid('foo@youtube.com')
    self.invalid('foo@google.com')
    self.valid('ok@gmail.com')

if __name__ == '__main__':
    unittest.main()
