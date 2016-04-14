# MailChecker
[![Build Status](https://img.shields.io/circleci/project/FGRibreau/mailchecker.svg)](https://circleci.com/gh/FGRibreau/mailchecker/) [![Deps](	https://img.shields.io/david/FGRibreau/mailchecker.svg)](https://david-dm.org/FGRibreau/mailchecker) [![NPM version](https://img.shields.io/npm/v/mailchecker.svg)](http://badge.fury.io/js/mailchecker) [![Gem version](https://img.shields.io/gem/v/ruby-mailchecker.svg)](http://badge.fury.io/js/mailchecker) [![Packagist version](https://img.shields.io/packagist/v/FGRibreau/mailchecker.svg)](https://packagist.org/packages/fgribreau/mailchecker) [![Downloads](http://img.shields.io/npm/dm/mailchecker.svg)](https://www.npmjs.com/package/mailchecker) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)

Cross-language email validation. Backed by a [database](./list.json) of **2107 throwable email providers**.

* Validate the format of your email (uses [validator.js](https://github.com/chriso/validator.js/blob/master/validator.js#L38) email regex underneath and `FILTER_VALIDATE_EMAIL` for PHP)
* Validate if the email is not a **temporary mail** (yopmail-like..., [add your own dataset to list.json](./list.json))

This will be very helpful when you have to contact your users and you want to avoid errors causing lack of communication or want to block "spamboxes".

-------------------------

> Need a **free Redis GUI**?
>
> Redsmin offers real-time, atomic, performant administration and monitoring services for Redis


<p align="center"><a href="https://redsmin.com?gh">Start administrating your Redis servers now<br/><img src="https://www.redsmin.com/im/mac-video.png"/></a></p>

------------------------

# Upgrade from 1.x to 3.x

Mailchecker public API has been normalized, here are the changes:

- NodeJS/JavaScript: `MailChecker(email)` -> `MailChecker.isValid(email)`
- PHP: `MailChecker($email)` -> `MailChecker::isValid($email)`
- Python

```python
import MailChecker
m = MailChecker.MailChecker()
if not m.is_valid('bla@example.com'):
  # ...
```

became:

```python
import MailChecker
if not MailChecker.is_valid('bla@example.com'):
  # ...
```

-------------------------

MailChecker currently supports:
* [NodeJS](https://github.com/FGRibreau/mailchecker/tree/master/platform/node) (CommonJS)
* [JavaScript](https://github.com/FGRibreau/mailchecker/tree/master/platform/javascript) (Client-Side)
* [PHP](https://github.com/FGRibreau/mailchecker/tree/master/platform/php)
* [Python](https://github.com/FGRibreau/mailchecker/tree/master/platform/python)
* [Ruby](https://github.com/FGRibreau/mailchecker/tree/master/platform/ruby)
* [Elixir](https://github.com/FGRibreau/mailchecker/tree/master/platform/elixir)
* [Clojure](https://github.com/FGRibreau/mailchecker/tree/master/platform/clojure)
* **Easily add support for your own language with MailChecker template system and [send us a pull-request!](https://github.com/FGRibreau/mailchecker/fork_select)**

-------------------------
## Usage

### NodeJS

```javascript
var MailChecker = require('mailchecker');

if(!MailChecker.isValid('myemail@yopmail.com')){
  console.error('O RLY !');
  process.exit(1);
}

if(!MailChecker.isValid('myemail.com')){
  console.error('O RLY !');
  process.exit(1);
}
```

### JavaScript
```html
<script type="text/javascript" src="MailChecker/platform/javascript/MailChecker.js"></script>
<script type="text/javascript">
if(!MailChecker.isValid('myemail@yopmail.com')){
  console.error('O RLY !');
}

if(!MailChecker.isValid('myemail.com')){
  console.error('O RLY !');
}
</script>
```

### PHP

```php
include __DIR__."/MailChecker/platform/php/MailChecker.php";

if(!MailChecker::isValid('myemail@yopmail.com')){
  die('O RLY !');
}

if(!MailChecker::isValid('myemail.com')){
  die('O RLY !');
}
```

### Elixir

```elixir
Code.require_file("mail_checker.ex", "mailchecker/platform/elixir/")

unless MailChecker.valid?("myemail@yopmail.com") do
  raise "O RLY !"
end

unless MailChecker.valid?("myemail.com") do
  raise "O RLY !"
end
```

### Python

```python
# no package yet; just drop in MailChecker.py where you want to use it.
import MailChecker

if not MailChecker.is_valid('bla@example.com'):
    print "O RLY !"
```

### Ruby [![Build Status](https://travis-ci.org/FGRibreau/mailchecker.svg)](https://travis-ci.org/FGRibreau/mailchecker)

```ruby
require 'mail_checker'

unless MailChecker('myemail@yopmail.com')
  fail('O RLY!')
end

unless MailChecker.valid?('myemail@yopmail.com')
  fail('O RLY!')
end
```

### Clojure

```clojure
; no package yet; just drop in mailchecker.clj where you want to use it.
(load-file "platform/clojure/mailchecker.clj")

(if (not (mailchecker/valid? "myemail@yopmail.com"))
  (throw (Throwable. "O RLY!")))

(if (not (mailchecker/valid? "myemail.com"))
  (throw (Throwable. "O RLY!")))
```

--------------------


## Installation

NodeJS/JavaScript
```bash
npm install mailchecker
```

Ruby
```bash
gem install ruby-mailchecker
```

PHP
```bash
composer require fgribreau/mailchecker
```

__We accept pull-requests for other package manager__.

## Data sources

[TorVPN](http://torvpn.com/temporaryemail.html)

```javascript
  $('td', 'table:last').map(function(){
    return this.innerText;
  }).toArray();
```

[BloggingWV](http://www.bloggingwv.com/big-list-of-disposable-temporary-email-services/)

```javascript
  Array.prototype.slice.call(document.querySelectorAll('.entry > ul > li a')).map(function(el){return el.innerText});
```

... [please add your own dataset to list.json](./list.json).

Regenerate libraries from list.json
-------------------------------

Just run (requires NodeJS):

```
npm run build
```

## Donate

I maintain this project in my free time, if it helped you please support my work [via paypal](https://paypal.me/fgribreau) or [Bitcoins](https://www.coinbase.com/fgribreau), thanks a lot!

## [Changelog](/CHANGELOG.md)


## License
Copyright (c) Francois-Guillaume Ribreau
Licensed under the MIT license.
