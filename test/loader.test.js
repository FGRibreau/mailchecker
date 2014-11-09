var _ = require('lodash');
var loader = null;
var t = require('assert');

suite('Loader', function () {
  setup(function () {
    loader = require('../lib/loader');
  });

  suite('#getLists', function () {
    test('should return an array', function () {
      t.ok(_.isArray(loader.getLists()));
    });

    test('should return an array of array', function () {
      loader.getLists().forEach(function (v, i) {
        t.ok(_.isArray(v), "index " + i);
      });
    });
  });

  suite('#getList', function () {
    test('should return an array', function () {
      t.ok(_.isArray(loader.getList()));
    });

    test('should return an array of string', function () {
      loader.getList().forEach(function (v, i) {
        t.ok(_.isString(v), "index " + i);
      });
    });
  });

});
