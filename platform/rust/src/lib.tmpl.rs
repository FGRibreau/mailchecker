#[cfg(test)]
#[macro_use]
extern crate pretty_assertions;

extern crate fast_chemail;

static BLACKLIST: &'static [&'static str] = &[{{ &listSTR }}];


/// # Usage
///
///
/// The `mailchecker` crate provides a `is_valid(email)` function that ensure the email is valid **and** does not come from a disposable email service.
///
/// # Examples
///
/// Emails below will be considered valid:
///
/// ```
/// extern crate mailchecker;
///
/// assert_eq!(true, mailchecker::is_valid("plop@plop.com"));
/// assert_eq!(true, mailchecker::is_valid("my.ok@ok.plop.com"));
/// assert_eq!(true, mailchecker::is_valid("my+ok@ok.plop.com"));
/// assert_eq!(true, mailchecker::is_valid("my=ok@ok.plop.com"));
/// assert_eq!(true, mailchecker::is_valid("ok@gmail.com"));
/// assert_eq!(true, mailchecker::is_valid("ok@hotmail.com"));
/// ```
///
/// Emails below will be considered invalid because of a wrong format:
///
/// ```
/// extern crate mailchecker;
///
/// assert_eq!(false, mailchecker::is_valid(""));
/// assert_eq!(false, mailchecker::is_valid("plopplop.com"));
/// assert_eq!(false, mailchecker::is_valid("my+ok@ok=plop.com"));
/// assert_eq!(false, mailchecker::is_valid("my,ok@ok.plop.com"));
/// assert_eq!(false, mailchecker::is_valid("  ok@gmail.com  "));
/// assert_eq!(false, mailchecker::is_valid("  ok@gmail.com"));
/// assert_eq!(false, mailchecker::is_valid("ok@gmail.com  "));
/// assert_eq!(false, mailchecker::is_valid("\nok@gmail.com\n"));
/// assert_eq!(false, mailchecker::is_valid("\nok@gmail.com"));
/// assert_eq!(false, mailchecker::is_valid("ok@gmail.com\n"));
/// ```
///
/// Emails below will be considered invalid because they came from an invalid domain
///
/// ```
/// extern crate mailchecker;
///
/// assert_eq!(false, mailchecker::is_valid("ok@33mail.com"));
/// assert_eq!(false, mailchecker::is_valid("ok@ok.33mail.com"));
/// assert_eq!(false, mailchecker::is_valid("ok@guerrillamailblock.com"));
/// ```
pub fn is_valid(email: &str) -> bool {
  // first check that the email is valid
  if !fast_chemail::is_valid_email(email) {
    return false;
  }

  let lowercase_email = email.to_lowercase();
  let email_domain_is_in_blacklist = all_domain_suffixes(&lowercase_email).iter().any(|ref domain| suffix_is_blacklisted(domain));
  return !email_domain_is_in_blacklist;
}

fn all_domain_suffixes(email: &str) -> Vec<String>{
  let domains = email.split("@").skip(1).collect::<String>();
  let domain_part: Vec<&str> = domains.split('.').collect();
  (1..domain_part.len()+1).map(|i| (domain_part[0..i]).iter().map(|&x| x).collect::<Vec<&str>>().join(".")).collect::<Vec<String>>()
}


fn suffix_is_blacklisted(domain: &str) -> bool{
  return BLACKLIST.contains(&domain)
}

/// # Usage
///
///
/// `blacklist` exposes the vector of disposable domains
///
///
///
/// ```
/// extern crate mailchecker;
///
/// assert!(mailchecker::blacklist().len() > 2000, "blacklist should at least contain 2000 items");
/// ```

pub fn blacklist() -> Vec<&'static str> {
  return BLACKLIST.to_vec();
}


// Helpers
// https://gist.github.com/FGRibreau/9bab6501c13367e787b5f31dc1d670f4

use std::iter::FromIterator;

trait ExtendedIterator: Iterator {
  fn tail<B>(&mut self) -> B where B:FromIterator<Self::Item>, Self::Item: Eq + Clone, Self: Sized{
    self.skip(1).collect::<B>()
  }
}

impl<I> ExtendedIterator for I where I: Iterator {}
