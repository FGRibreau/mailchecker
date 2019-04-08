'use strict';

var fs = require('fs');
var p = require('path');
var _ = require('lodash');

/**
 * Load and make an uniq list of throwable email domain
 * @type {Object}
 */
var loader = {
  getList: function () {
    var path = p.resolve(__dirname, '../list.txt');
    return _.uniq(this.getDomains(path));
  },

  getDomains: function (path) {
    return fs
      .readFileSync(path)
      .toString()
      .trim()
      .split("\n");
  }
};

module.exports = loader;
