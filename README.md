

Sources
-------

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

Regenerate library from list.js
-------------------------------

./gen.js
