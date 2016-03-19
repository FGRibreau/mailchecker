'use strict';

var cjson = require('cjson');
var p = require('path');
var _ = require('lodash');

/**
 * Load and make an uniq list of throwable email domain
 * @type {Object}
 */
var loader = {
  getList: function () {
    return _.flowRight(_.flatten, _.uniq)(this.getLists());
  },

  getLists: function () {
    return cjson.load(p.resolve(__dirname, '../list.json'));
  }
};

module.exports = loader;
