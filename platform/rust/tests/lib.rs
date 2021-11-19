extern crate mailchecker;
#[macro_use] extern crate pretty_assertions;

#[test]
fn should_ensure_email_are_valid() {
  //assert_eq!(true, mailchecker::is_valid("plop@plop.com"));
  //assert_eq!(true, mailchecker::is_valid("my.ok@ok.plop.com"));
  //assert_eq!(true, mailchecker::is_valid("my+ok@ok.plop.com"));
  //assert_eq!(true, mailchecker::is_valid("my=ok@ok.plop.com"));
  assert_eq!(true, mailchecker::is_valid("ok@gmail.com"));
  //assert_eq!(true, mailchecker::is_valid("ok@hotmail.com"));
}

#[test]
fn should_ensure_email_are_invalid() {
  assert_eq!(false, mailchecker::is_valid(""));
  assert_eq!(false, mailchecker::is_valid("plopplop.com"));
  assert_eq!(false, mailchecker::is_valid("my+ok@ok=plop.com"));
  assert_eq!(false, mailchecker::is_valid("my,ok@ok.plop.com"));
  assert_eq!(false, mailchecker::is_valid("  ok@gmail.com  "));
  assert_eq!(false, mailchecker::is_valid("  ok@gmail.com"));
  assert_eq!(false, mailchecker::is_valid("ok@gmail.com  "));
  assert_eq!(false, mailchecker::is_valid("\nok@gmail.com\n"));
  assert_eq!(false, mailchecker::is_valid("\nok@gmail.com"));
  assert_eq!(false, mailchecker::is_valid("ok@gmail.com\n"));
}

#[test]
fn should_ensure_blacklisted_domain_are_invalid() {
  assert_eq!(false, mailchecker::is_valid("ok@33mail.com"));
  assert_eq!(false, mailchecker::is_valid("ok@ok.33mail.com"));
  assert_eq!(false, mailchecker::is_valid("ok@guerrillamailblock.com"));
}

#[test]
fn should_ensure_custom_domains_are_invalid() {
  assert_eq!(true, mailchecker::is_valid("foo@youtube.com"));
  assert_eq!(true, mailchecker::is_valid("foo@google.com"));
  assert_eq!(true, mailchecker::is_valid("ok@gmail.com"));

  mailchecker::add_custom_domains(["youtube.com", "google.com"].to_vec());

  assert_eq!(false, mailchecker::is_valid("foo@youtube.com"));
  assert_eq!(false, mailchecker::is_valid("foo@google.com"));
  assert_eq!(true, mailchecker::is_valid("ok@gmail.com"));
}
