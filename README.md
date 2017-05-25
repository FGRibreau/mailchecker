# MailChecker

[![Build Status](https://img.shields.io/circleci/project/FGRibreau/mailchecker.svg)](https://circleci.com/gh/FGRibreau/mailchecker/) [![Deps](	https://img.shields.io/david/FGRibreau/mailchecker.svg)](https://david-dm.org/FGRibreau/mailchecker) [![NPM version](https://img.shields.io/npm/v/mailchecker.svg)](http://badge.fury.io/js/mailchecker) [![Gem version](https://img.shields.io/gem/v/ruby-mailchecker.svg)](http://badge.fury.io/js/mailchecker) [![Packagist version](https://img.shields.io/packagist/v/FGRibreau/mailchecker.svg)](https://packagist.org/packages/fgribreau/mailchecker) [![Cargo version](https://img.shields.io/crates/v/mailchecker.svg)](https://crates.io/crates/mailchecker) [![Downloads](http://img.shields.io/npm/dm/mailchecker.svg)](https://www.npmjs.com/package/mailchecker)

[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/francois-guillaume-ribreau?utm_source=github&utm_medium=button&utm_term=francois-guillaume-ribreau&utm_campaign=github)  [![available-for-advisory](https://img.shields.io/badge/available%20for%20advising-yes-ff69b4.svg?)](http://bit.ly/2c7uFJq) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg?)

Cross-language email validation. Backed by a [database](./list.json) of **2740 throwable email providers**.

* Validate the format of your email (uses [validator.js](https://github.com/chriso/validator.js/blob/master/validator.js#L38) email regex underneath and `FILTER_VALIDATE_EMAIL` for PHP)
* Validate if the email is not a **temporary mail** (yopmail-like..., [add your own dataset to list.json](./list.json))

This will be very helpful when you have to contact your users and you want to avoid errors causing lack of communication or want to block "spamboxes".

-------------------------

<!--
> Need a **free Redis GUI**?
>
> Redsmin offers real-time, atomic, performant administration and monitoring services for Redis


<p align="center"><a href="https://redsmin.com?gh">Start administrating your Redis servers now<br/><img src="https://www.redsmin.com/im/mac-video.png"/></a></p>-->

> Need to embed a charts into an email?
>
> It's over with **[Image-Charts](https://image-charts.com?gh_mailchecker)**, no more server-side rendering pain, 1 url = 1 chart.

```
https://image-charts.com/chart?
cht=lc // chart type
&chd=s:cEAELFJHHHKUju9uuXUc // chart data
&chxt=x,y // axis
&chxl=0:|0|1|2|3|4|5| // axis labels
&chs=873x200 // size
```

<p align="center"><strong><a href="https://image-charts.com?gh_mailchecker">Use Image-Charts for free<br/><img src="https://image-charts.com/chart?cht=lc&chd=s:cEAELFJHHHKUju9uuXUc&chco=76A4FB&chls=2.0,0.0,0.0&chxt=x,y&chxl=0:%7C0%7C1%7C2%7C3%7C4%7C5%7C1:%7C0%7C50%7C100&chs=873x200&chg=20,50&chan&chf=b0,lg,90,4CA4F5,0.1,C371D3,0.8,EA469E,1"/></a></strong></p>

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
* [Rust](https://github.com/FGRibreau/mailchecker/tree/master/platform/rust)
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

unless MailChecker.valid?('myemail@yopmail.com')
  fail('O RLY!')
end
```


### Rust

```rust
 extern crate mailchecker;

assert_eq!(true, mailchecker::is_valid("plop@plop.com"));
assert_eq!(false, mailchecker::is_valid("\nok@gmail.com\n"));
assert_eq!(false, mailchecker::is_valid("ok@guerrillamailblock.com"));
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

<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://bit.ly/2c7uFJq">Francois-Guillaume Ribreau</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=FGRibreau" title="View the GitHub contributions of Francois-Guillaume Ribreau on repository FGRibreau/mailchecker">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?

<span class="badge-patreon"><a href="http://patreon.com/fgribreau" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-gratipay"><a href="https://www.gratipay.com/fgribreau" title="Donate weekly to this project using Gratipay"><img src="https://img.shields.io/badge/gratipay-donate-yellow.svg" alt="Gratipay donate button" /></a></span>
<span class="badge-flattr"><a href="https://flattr.com/profile/fgribreau" title="Donate to this project using Flattr"><img src="https://img.shields.io/badge/flattr-donate-yellow.svg" alt="Flattr donate button" /></a></span>
<span class="badge-paypal"><a href="https://fgribreau.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-bitcoin"><a href="https://www.coinbase.com/fgribreau" title="Donate once-off to this project using Bitcoin"><img src="https://img.shields.io/badge/bitcoin-donate-yellow.svg" alt="Bitcoin donate button" /></a></span>

<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://www.owenstephens.co.uk">Owen Stephens</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=owst" title="View the GitHub contributions of Owen Stephens on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://jacobburenstam.com">Jacob Burenstam</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=buren" title="View the GitHub contributions of Jacob Burenstam on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://hermanslatman.nl">Herman Slatman</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=hslatman" title="View the GitHub contributions of Herman Slatman on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/trisix">trisix</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=trisix" title="View the GitHub contributions of trisix on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://greenkeeper.io/">Greenkeeper</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=greenkeeperio-bot" title="View the GitHub contributions of Greenkeeper on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://wusty.io">Dustin Clark</a></li>
<li><a href="http://antonz.ru/">Anton Zhiyanov</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=algenon" title="View the GitHub contributions of Anton Zhiyanov on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/NBruel">Bruel Nicolas</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=NBruel" title="View the GitHub contributions of Bruel Nicolas on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/R-J">Robin</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=R-J" title="View the GitHub contributions of Robin on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/Spir">Spir</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=Spir" title="View the GitHub contributions of Spir on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://flat.io">Vincent Giersch</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=gierschv" title="View the GitHub contributions of Vincent Giersch on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/watadarkstar">watadarkstar</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=watadarkstar" title="View the GitHub contributions of watadarkstar on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://djpowers.github.io">Dave Powers</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=djpowers" title="View the GitHub contributions of Dave Powers on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/frankydp">Frank Phillips</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=frankydp" title="View the GitHub contributions of Frank Phillips on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/LuckyDino">LuckyDino</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=LuckyDino" title="View the GitHub contributions of LuckyDino on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/vendethiel">ven</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=vendethiel" title="View the GitHub contributions of ven on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://www.linkedin.com/in/romaingay">Romain Gay</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=vikbez" title="View the GitHub contributions of Romain Gay on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://stormforger.com">Sebastian Cohnen</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=tisba" title="View the GitHub contributions of Sebastian Cohnen on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/dav1a1223">Dalai</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=dav1a1223" title="View the GitHub contributions of Dalai on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/quaswex">quaswex</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=quaswex" title="View the GitHub contributions of quaswex on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/sxyuan">sxyuan</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=sxyuan" title="View the GitHub contributions of sxyuan on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://bit.ly/2c7uFJq">Francois-Guillaume Ribreau</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=FGRibreau" title="View the GitHub contributions of Francois-Guillaume Ribreau on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://dusty.wtf">Dustin Clark</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=dustywusty" title="View the GitHub contributions of Dustin Clark on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://synpro.io">larsvegas</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=larsvegas" title="View the GitHub contributions of larsvegas on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="zeeshanmuhammad.com">Zeeshan Muhammad</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=zeeshan83" title="View the GitHub contributions of Zeeshan Muhammad on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/kkleejoe">kkleejoe</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=kkleejoe" title="View the GitHub contributions of kkleejoe on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://www.freneda.com.br">Luiz Freneda</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=lfreneda" title="View the GitHub contributions of Luiz Freneda on repository FGRibreau/mailchecker">view contributions</a></li></ul>



<!-- /BACKERS -->


## [Changelog](/CHANGELOG.md)

<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://fgribreau.com">Francois-Guillaume Ribreau</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
