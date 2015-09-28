require 'minitest/autorun'

require_relative '../platform/ruby/mail_checker'

class TestMailChecker < MiniTest::Unit::TestCase
  def valid!(email)
    assert_equal MailChecker(email), true
  end

  def invalid!(email)
    assert_equal MailChecker(email), false
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
    invalid!('plopplop.com')
    invalid!('my+ok@ok=plop.com')
    invalid!('my,ok@ok.plop.com')
    invalid!('ok@tmail.com')
  end

  def test_return_false_if_throwable_domain
    invalid!('ok@33mail.com')
    invalid!('ok@ok.33mail.com')
    invalid!('ok@guerrillamailblock.com')
  end

  def test_can_be_called_as_regular_method
    assert_equal MailChecker.valid?(nil), false
  end
end
