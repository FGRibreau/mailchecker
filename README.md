# MailChecker [![Build Status](https://drone.io/github.com/FGRibreau/mailchecker/status.png)](https://drone.io/github.com/FGRibreau/mailchecker/latest) [![Deps](https://david-dm.org/FGRibreau/mailchecker.png)](https://david-dm.org/FGRibreau/mailchecker) [![Version](http://badge.fury.io/js/mailchecker.png)](http://badge.fury.io/js/mailchecker)
![npm](https://nodei.co/npm/mailchecker.png)

Cross-language email validation. Backed by a [database](./list.json) of **470 throwable email providers**.

* Validate the format of your email (uses [node-validator](https://github.com/chriso/node-validator/blob/master/lib/validators.js#L27) email regex underneath and `FILTER_VALIDATE_EMAIL` for PHP)
* Validate if the email is not a **temporary mail** (yopmail-like..., [add your own dataset to list.json](./list.json))

This will be very helpful when you have to contact your users and you want to avoid errors causing lack of communication or want to block "spamboxes".

-------------------------

MailChecker currently supports:
* [NodeJS](https://github.com/FGRibreau/mailchecker/tree/master/platform/node) (CommonJS)
* [JavaScript](https://github.com/FGRibreau/mailchecker/tree/master/platform/javascript) (Client-Side)
* [PHP](https://github.com/FGRibreau/mailchecker/tree/master/platform/php)
* **Easily add support for your own language with MailChecker template system and [send us a pull-request!](https://github.com/FGRibreau/mailchecker/fork_select)**

-------------------------
## Usage

### NodeJS

```javascript
var MailChecker = require('mailchecker');

if(!MailChecker('myemail@yopmail.com')){
  console.error('O RLY !');
  process.exit(1);
}

if(!MailChecker('myemail.com')){
  console.error('O RLY !');
  process.exit(1);
}
```

### JavaScript
```html
<script type="text/javascript" src="MailChecker/platform/javascript/MailChecker.js"></script>
<script type="text/javascript">
if(!MailChecker('myemail@yopmail.com')){
  console.error('O RLY !');
}

if(!MailChecker('myemail.com')){
  console.error('O RLY !');
}
</script>
```

### PHP
```php
include __DIR__."/MailChecker/platform/php/MailChecker.php";

if(!MailChecker('myemail@yopmail.com')){
  die('O RLY !');
}

if(!MailChecker('myemail.com')){
  die('O RLY !');
}
```

--------------------


## Installation

NodeJS/JavaScript
```bash
npm install mailchecker
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
./gen.js
```

## Donate
[Donate Bitcoins](https://coinbase.com/checkouts/fc3041b9d8116e0b98e7d243c4727a30)

## Changelog

v0.2.0
 - upgrade unsecure deps
 - add `mailtothis.com`

v0.1.11

## License
Copyright (c) 2013 Francois-Guillaume Ribreau
Licensed under the MIT license.
