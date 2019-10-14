'use strict';

var fs = require('fs');
var p = require('path');
var psl = require('psl');

var path = p.resolve(__dirname, '../list.txt');
var rawList = fs.readFileSync(path)
                .toString()
                .trim()
                .split("\n");

var cleanedList = rawList.filter(function(domain){
  var parsed = psl.parse(domain); 
  return parsed.listed;
});

fs.writeFileSync(path, cleanedList.join("\n"))
