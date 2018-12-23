const cjson = require('cjson');
const p = require('path');
const _ = require('lodash');

/**
 * Load and make an uniq list of throwable email domain
 * @type {Object}
 */
const loader = {
  getList() {
    return _.flowRight(_.flattenDeep, _.uniq)(this.getLists());
  },

  getLists() {
    return cjson.load(p.resolve(__dirname, '../list.json'));
  },
};

module.exports = loader;
