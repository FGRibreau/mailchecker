#!/usr/bin/env node

'use strict';
var converter = require('./lib/converter');
console.log('Compiling list to JSON...');
var domainCount = converter.toJson('list.txt', 'list.json');
console.log('Compiled ' + domainCount + ' domains.');
