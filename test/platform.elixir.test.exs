# Run tests from the repository root directory:
# $ elixir test/platform.elixir.test.exs
ExUnit.start

try do
  Code.require_file("mail_checker.ex", "platform/elixir/")
rescue
  _ -> raise ArgumentError, message: "You must be in the repository root directory in order to run the tests."
end

defmodule MailCheckerTest do
  use ExUnit.Case

  test "should return true if the email is valid" do
    assert MailChecker.valid?("plop@plop.com")
    assert MailChecker.valid?("my.ok@ok.plop.com")
    assert MailChecker.valid?("my+ok@ok.plop.com")
    assert MailChecker.valid?("my=ok@ok.plop.com")
    assert MailChecker.valid?("ok@gmail.com")
    assert MailChecker.valid?("ok@hotmail.com")
  end

  test "should return false if the email is invalid" do
    assert MailChecker.valid?("plopplop.com") == false
    assert MailChecker.valid?("my+ok@ok°plop.com") == false
    assert MailChecker.valid?("my+ok@ok=plop.com") == false
    assert MailChecker.valid?("my,ok@ok.plop.com") == false
    assert MailChecker.valid?("ok@tmail.com") == false
  end

  test "should return false if the email come from a throwable domain" do
    assert MailChecker.valid?("ok@33mail.com") == false
    assert MailChecker.valid?("ok@ok.33mail.com") == false
  end

end
