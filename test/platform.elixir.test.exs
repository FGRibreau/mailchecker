# Run tests from the repository root directory:
# $ elixir test/platform.elixir.test.exs
ExUnit.start

try do
  Code.require_file("mail_checker.ex", "platform/elixir/")
rescue
  Code.LoadError -> raise ArgumentError, message: "You must be in the repository root directory in order to run the tests."
end

defmodule MailCheckerTest do
  use ExUnit.Case

  def assert_valid_result(result, email) do
    message = "Expected '" <> email <> "' to " <> (if result, do: " ", else: "not ") <> "be valid!"
    assert(MailChecker.valid?(email) == result, message)
  end

  def assert_valid(email) do
    assert_valid_result(true, email)
  end

  def assert_invalid(email) do
    assert_valid_result(false, email)
  end

  test "should return true if the email is valid" do
    assert_valid("plop@plop.com")
    assert_valid("my.ok@ok.plop.com")
    assert_valid("my+ok@ok.plop.com")
    assert_valid("my=ok@ok.plop.com")
    assert_valid("ok@gmail.com")
    assert_valid("ok@hotmail.com")
  end

  test "should return false if the email is invalid" do
    assert_invalid("plopplop.com")
    assert_invalid("my+ok@ok°plop.com")
    assert_invalid("my+ok@ok=plop.com")
    assert_invalid("my,ok@ok.plop.com")
    assert_invalid("  ok@gmail.com  ")
    assert_invalid("  ok@gmail.com")
    assert_invalid("ok@gmail.com  ")
    assert_invalid("\nok@gmail.com\n")
    assert_invalid("\nok@gmail.com")
    assert_invalid("ok@gmail.com\n")
  end

  test "should return false if the email come from a throwable domain" do
    assert_invalid("ok@tmail.com")
    assert_invalid("ok@33mail.com")
    assert_invalid("ok@ok.33mail.com")
    assert_invalid("ok@guerrillamailblock.com")
  end

  test "should return false if the email is from a blacklisted domain" do
    Enum.each(MailChecker.blacklist, fn domain ->
        assert_invalid("test@" <> domain)
        assert_invalid("test@subdomain." <> domain)
        assert_valid("test@" <> domain <> ".gmail.com")
    end)
  end

  test "should return false if the email is from a custom domain" do
    assert_valid("foo@youtube.com")
    assert_valid("foo@google.com")
    assert_valid("ok@gmail.com")

    MailChecker.add_custom_domains(["youtube.com", "google.com"])

    assert_invalid("foo@youtube.com")
    assert_invalid("foo@google.com")
    assert_valid("ok@gmail.com")

    MailChecker.add_custom_domains(["gmail.com"])

    assert_invalid("ok@gmail.com")
  end
end
