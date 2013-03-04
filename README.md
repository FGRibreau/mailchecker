# MailChecker [![Build Status](https://drone.io/github.com/FGRibreau/mailchecker/status.png)](https://drone.io/github.com/FGRibreau/mailchecker/latest)

Multi-language email validation.

* Validate the format of your email
* Validate if the email is not a temporary mail (like yopmail or others...)

This will be very helpful when you have to contact your users and you want to avoid errors causing lack of communication or want to block "spamboxes".

MailChecker currently supports:

* [NodeJS(CommonJS)](./mailchecker/tree/master/platform/node)
* [JavaScript (client-side)](./mailchecker/tree/master/platform/javascript).
* [PHP]((./mailchecker/tree/master/platform/php))
* **Easily add support for your own language with MailChecker template system and [send us a pull-request!](https://github.com/FGRibreau/mailchecker/fork_select)**

## Installation

NodeJS/JavaScript
```bash
npm install mailchecker
./node/modules/mailchecker/gen.js
```

We accept pull-requests for enabling package manager.

## Sources

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

Regenerate libraries from list.json
-------------------------------

Just run: (requires NodeJS)
```
./gen.js
```
