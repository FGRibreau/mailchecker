# Run tests from the repository root directory:
# $ bundle install && bundle exec ruby test/platform.ruby.test.rb
require 'minitest/autorun'

require_relative '../platform/ruby/mail_checker'

class TestMailChecker < MiniTest::Test
  def valid!(email)
    assert_equal true, MailChecker(email)
  end

  def invalid!(email)
    assert_equal false, MailChecker(email)
  end

  def test_return_true_if_valid
    valid!('plop@plop.com')
    valid!('my.ok@ok.plop.com')
    valid!('my+ok@ok.plop.com')
    valid!('my=ok@ok.plop.com')
    valid!('ok@gmail.com')
    valid!('ok@hotmail.com')
  end

  def test_return_false_if_email_invalid
    invalid!('')
    invalid!('  ')
    invalid!('plopplop.com')
    invalid!('my+ok@ok=plop.com')
    invalid!('my,ok@ok.plop.com')
    invalid!("  ok@gmail.com  ")
    invalid!("  ok@gmail.com")
    invalid!("ok@gmail.com  ")
    invalid!("\nok@gmail.com\n")
    invalid!("\nok@gmail.com")
    invalid!("ok@gmail.com\n")
  end

  def test_return_false_if_throwable_domain
    invalid!('ok@tmail.com')
    invalid!('ok@33mail.com')
    invalid!('ok@ok.33mail.com')
    invalid!('ok@guerrillamailblock.com')
  end

  def test_return_false_for_blacklisted_domains_and_their_subdomains
    MailChecker::BLACKLIST.each do |blacklisted_domain|
      invalid!("test@#{blacklisted_domain}")
      invalid!("test@subdomain.#{blacklisted_domain}")
      # Should not be invalid as a subdomain of a valid domain.
      valid!("test@#{blacklisted_domain}.gmail.com")
    end
  end

  def test_can_be_called_as_regular_method
    assert_equal false, MailChecker.valid?(nil)
  end

  def test_extract_all_domain_suffixes
    expected = %w(sub.example.org example.org org)
    assert_equal expected, MailChecker.extract_all_domain_suffixes('test@sub.example.org')
  end

  def test_add_custom_domains
    valid!('foo@youtube.com')
    valid!('foo@google.com')
    valid!('ok@gmail.com')

    MailChecker.add_custom_domains(['youtube.com', 'google.com'])

    invalid!('foo@youtube.com')
    invalid!('foo@google.com')
    valid!('ok@gmail.com')
  end
end
