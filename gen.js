#!/usr/bin/env node

'use strict';
console.log("Compiling libraries from templates...");
var gen = require('./lib/generator');
var _ = require('lodash');

gen.on('*', function (v) {
  if (_.isArray(v)) {
    v = v.length;
  } else {
    v = v.template;
  }
  console.info('[', this.event, ']\t', v);
});

gen.compile(function () {
  console.log('Done.');
});
