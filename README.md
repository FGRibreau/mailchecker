# MailChecker

[![Deps](	https://img.shields.io/david/FGRibreau/mailchecker.svg)](https://david-dm.org/FGRibreau/mailchecker) [![Downloads](http://img.shields.io/npm/dm/mailchecker.svg)](https://www.npmjs.com/package/mailchecker) 

[![NPM version](https://img.shields.io/npm/v/mailchecker.svg)](http://badge.fury.io/js/mailchecker) ![npm](https://img.shields.io/npm/dm/mailchecker) [![Gem version](https://img.shields.io/gem/v/ruby-mailchecker.svg)](http://badge.fury.io/js/mailchecker) ![Gem](https://img.shields.io/gem/dt/mailchecker) [![PyPi version](https://img.shields.io/pypi/v/mailchecker.svg)](https://pypi.org/project/mailchecker/#history) ![PyPI - Downloads](https://img.shields.io/pypi/dm/mailchecker) [![Packagist version](https://img.shields.io/packagist/v/fgribreau/mailchecker.svg)](https://packagist.org/packages/fgribreau/mailchecker) ![Packagist](https://img.shields.io/packagist/dm/fgribreau/mailchecker) [![Cargo version](https://img.shields.io/crates/v/mailchecker.svg)](https://crates.io/crates/mailchecker) ![Crates.io](https://img.shields.io/crates/d/mailchecker) [![GoDoc](https://godoc.org/github.com/FGRibreau/mailchecker/platform/go?status.svg)](https://godoc.org/github.com/FGRibreau/mailchecker/platform/go)

[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/francois-guillaume-ribreau?utm_source=github&utm_medium=button&utm_term=francois-guillaume-ribreau&utm_campaign=github)  [![available-for-advisory](https://img.shields.io/badge/available%20for%20advising-yes-ff69b4.svg?)](http://bit.ly/2c7uFJq) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg?)

Cross-language email validation. Backed by a [database](./list.txt) of **over 30 000 throwable email domains**.

* Validate the format of your email (uses [validator.js](https://github.com/chriso/validator.js/blob/master/validator.js#L38) email regex underneath and `FILTER_VALIDATE_EMAIL` for PHP)
* Validate if the email is not a **temporary mail** (yopmail-like..., [add your own dataset to list.txt](./list.txt))

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
* [NodeJS](https://github.com/FGRibreau/mailchecker/tree/master/platform/node) (CommonJS, [Instructions](#nodejs))
* [JavaScript](https://github.com/FGRibreau/mailchecker/tree/master/platform/javascript) (Client-Side, [Instructions](#javascript))
* [PHP](https://github.com/FGRibreau/mailchecker/tree/master/platform/php) ([Instructions](#php))
* [Python](https://github.com/FGRibreau/mailchecker/tree/master/platform/python) ([Instructions](#python))
* [Ruby](https://github.com/FGRibreau/mailchecker/tree/master/platform/ruby) ([Instructions](#ruby))
* [Rust](https://github.com/FGRibreau/mailchecker/tree/master/platform/rust) ([Instructions](#rust))
* [Elixir](https://github.com/FGRibreau/mailchecker/tree/master/platform/elixir) ([Instructions](#elixir))
* [Clojure](https://github.com/FGRibreau/mailchecker/tree/master/platform/clojure) ([Instructions](#clojure))
* [Go](https://github.com/FGRibreau/mailchecker/tree/master/platform/go) ([Instructions](#go))
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

```
pip install mailchecker
```

```python
# no package yet; just drop in MailChecker.py where you want to use it.
from MailChecker import MailChecker

if not MailChecker.is_valid('bla@example.com'):
    print "O RLY !"
```

Django validator: https://github.com/jonashaag/django-indisposable

### Ruby

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

### Go

```go
package main

import (
  "log"
  
  "github.com/FGRibreau/mailchecker/platform/go"
)

if !mail_checker.IsValid('myemail@yopmail.com') {
  log.Fatal('O RLY !');
}

if !mail_checker.IsValid('myemail.com') {
  log.Fatal("O RLY !")
}
```

--------------------


## Installation

Go
```bash
go get https://github.com/FGRibreau/mailchecker
```

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

... [please add your own dataset to list.txt](./list.txt).

Regenerate libraries from list.txt
-------------------------------

Just run (requires NodeJS):

```
npm run build
```

## Development

Development environment requires [docker](https://www.docker.com/).

```sh
# install and setup every language dependencies in parallel through docker
npm install

# run every language setup in parallel through docker
npm run setup

# run every language tests in parallel through docker
npm test
```

<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://bit.ly/2c7uFJq">Francois-Guillaume Ribreau</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=FGRibreau" title="View the GitHub contributions of Francois-Guillaume Ribreau on repository FGRibreau/mailchecker">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?

<span class="badge-patreon"><a href="https://patreon.com/fgribreau" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
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
<li><a href="http://antonz.ru/">Anton Zhiyanov</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=nalgeon" title="View the GitHub contributions of Anton Zhiyanov on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/NBruel">Bruel Nicolas</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=NBruel" title="View the GitHub contributions of Bruel Nicolas on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/R-J">Robin</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=R-J" title="View the GitHub contributions of Robin on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/Spir">Spir</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=Spir" title="View the GitHub contributions of Spir on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://flat.io">Vincent Giersch</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=gierschv" title="View the GitHub contributions of Vincent Giersch on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://adriancarolli.surge.sh/">Adrian Carolli</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=watadarkstar" title="View the GitHub contributions of Adrian Carolli on repository FGRibreau/mailchecker">view contributions</a></li>
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
<li><a href="http://dusty.wtf">Dustin Clark</a></li>
<li><a href="http://synpro.io">larsvegas</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=larsvegas" title="View the GitHub contributions of larsvegas on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="zeeshanmuhammad.com">Zeeshan Muhammad</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=zeeshan83" title="View the GitHub contributions of Zeeshan Muhammad on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/kkleejoe">kkleejoe</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=kkleejoe" title="View the GitHub contributions of kkleejoe on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://www.freneda.com.br">Luiz Freneda</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=lfreneda" title="View the GitHub contributions of Luiz Freneda on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/thorinisme">thorinisme</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=thorinisme" title="View the GitHub contributions of thorinisme on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/Outsidaz">Liudas Šumskas</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=Outsidaz" title="View the GitHub contributions of Liudas Šumskas on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/Wapweb">Alexandr</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=Wapweb" title="View the GitHub contributions of Alexandr on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://gitlab.com/datio/">Alex Dom￸aki￸dis</a></li>
<li><a href="http://zanaca.com">Carlos Rios</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=zanaca" title="View the GitHub contributions of Carlos Rios on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/jbzdak">Jacek Bzdak</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=jbzdak" title="View the GitHub contributions of Jacek Bzdak on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://github.com/apps/greenkeeper">greenkeeper[bot]</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=greenkeeper[bot]" title="View the GitHub contributions of greenkeeper[bot] on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/dustywusty">Dustin Clark</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=dustywusty" title="View the GitHub contributions of Dustin Clark on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://cashlink.io">Jonas Haag</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=jonashaag" title="View the GitHub contributions of Jonas Haag on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://alex.domakidis.com/">￸A￸l￸e￸x D￸o￸m￸a￸k￸i￸d￸i￸s</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=datio" title="View the GitHub contributions of ￸A￸l￸e￸x D￸o￸m￸a￸k￸i￸d￸i￸s on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/mcgregordan">Dan McGregor</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=mcgregordan" title="View the GitHub contributions of Dan McGregor on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://github.com/marketplace/greenkeeper">greenkeeper[bot]</a></li>
<li><a href="http://xthiago.com/">Thiago Rodrigues</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=xthiago" title="View the GitHub contributions of Thiago Rodrigues on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://www.dillilabs.com">Dilli Labs LLC</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=dillilabs" title="View the GitHub contributions of Dilli Labs LLC on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://rya.nc/">Ryan Castellucci</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=ryancdotorg" title="View the GitHub contributions of Ryan Castellucci on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://spokephone.com">Kieron Lawson</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=kieronlawson" title="View the GitHub contributions of Kieron Lawson on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://kslr.org">Kslr</a></li>
<li><a href="http://C0derLint.github.io">Lint</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=radiantly" title="View the GitHub contributions of Lint on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/chadliu23">chadliu23</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=chadliu23" title="View the GitHub contributions of chadliu23 on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://t.me/milkyklim">Klim Kolyvanov</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=milkyklim" title="View the GitHub contributions of Klim Kolyvanov on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/cosmosgenius">Sharat M R</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=cosmosgenius" title="View the GitHub contributions of Sharat M R on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/nicolasPerraud">Nicolas Perraud</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=nicolasPerraud" title="View the GitHub contributions of Nicolas Perraud on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/tbdmainrepo">tbdmainrepo</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=tbdmainrepo" title="View the GitHub contributions of tbdmainrepo on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/kslr">Kslr</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=kslr" title="View the GitHub contributions of Kslr on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://fabiocaccamo.com/">Fabio Caccamo</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=fabiocaccamo" title="View the GitHub contributions of Fabio Caccamo on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/nayluge">cyril souillard</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=nayluge" title="View the GitHub contributions of cyril souillard on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://blog.lyrixx.info">Grégoire Pineau</a></li>
<li><a href="meterian.io">Bruno Bossola</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=bbossola" title="View the GitHub contributions of Bruno Bossola on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/florian-crtl">florian-crtl</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=florian-crtl" title="View the GitHub contributions of florian-crtl on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://aneveningcalm.com">mikeyzm</a></li>
<li><a href="http://github.com/apps/dependabot-preview">dependabot-preview[bot]</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=dependabot-preview[bot]" title="View the GitHub contributions of dependabot-preview[bot] on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://lyrixx.info/">Grégoire Pineau</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=lyrixx" title="View the GitHub contributions of Grégoire Pineau on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/alongat">alonga</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=alongat" title="View the GitHub contributions of alonga on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="nitralabs.com">Vitalii Tverdokhlib</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=vitaliytv" title="View the GitHub contributions of Vitalii Tverdokhlib on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/F21">Francis Chuang</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=F21" title="View the GitHub contributions of Francis Chuang on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/mikeyzm">mikeyzm</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=mikeyzm" title="View the GitHub contributions of mikeyzm on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://www.syshack.ch">Pascal Vizeli</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=pvizeli" title="View the GitHub contributions of Pascal Vizeli on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/carolineBda">Caroline</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=carolineBda" title="View the GitHub contributions of Caroline on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="http://danielmihai.ro">Daniel Mihai</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=danmihai89" title="View the GitHub contributions of Daniel Mihai on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/hwvs">HWVS</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=hwvs" title="View the GitHub contributions of HWVS on repository FGRibreau/mailchecker">view contributions</a></li>
<li><a href="https://github.com/sydneyitguy">seb's</a> — <a href="https://github.com/FGRibreau/mailchecker/commits?author=sydneyitguy" title="View the GitHub contributions of seb's on repository FGRibreau/mailchecker">view contributions</a></li></ul>



<!-- /BACKERS -->


## [Changelog](/CHANGELOG.md)

<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://fgribreau.com">Francois-Guillaume Ribreau</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
