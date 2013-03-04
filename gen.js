#!/usr/bin/env node

console.log("Compiling libraries from templates...");
var gen = require('./lib/generator');

gen.on('*', function(template){
  console.info('[',this.event,']\t', template.template);
});
gen.compile(function(){
  console.log('Done.');
});
