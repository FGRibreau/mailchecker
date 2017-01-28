extern crate mailchecker;
use std::iter::FromIterator;

trait ExtendedIterator: Iterator {
  fn tail<B>(&mut self) -> B where B:FromIterator<Self::Item>, Self::Item: Eq + Clone, Self: Sized{
    self.next();
    self.collect()
  }
}

impl<I> ExtendedIterator for I where I: Iterator {}

fn main() {
//  let arr = vec!["okok@a.a.com", "a", "b"];
//  let t: Vec<_> = arr.iter().tail();
//  println!("Tail: {} {}", t[0], t[1]);
//
//  let t: Vec<_> = "ok@okok.@ok.com".split("@").tail();
  println!("Ok: {:?}", mailchecker::is_valid("ok@ok.com"));
}
