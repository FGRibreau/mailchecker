'use strict';

var fs = require('fs');

function loadDomains (path) {
  return fs
    .readFileSync(path)
    .toString()
    .split('\n');
}

function saveDomains (domains, path) {
  fs.writeFileSync(path, JSON.stringify([domains]));
}

function toJson (plainPath, jsonPath) {
  var domains = loadDomains(plainPath);
  saveDomains(domains, jsonPath);
  return domains.length;
}

module.exports.toJson = toJson;
