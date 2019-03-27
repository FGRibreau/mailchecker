var _ = require('lodash');
var loader = null;
var t = require('assert');

suite('Loader', function () {
  setup(function () {
    loader = require('../lib/loader');
  });

  suite('#getDomains', function () {
    test('should load domains from plain text file', function () {
      domains = loader.getDomains('test/list.test.txt');
      expected = ['one.com', 'two.org', 'three.net'];
      domains.toString().should.equal(expected.toString());
    });
  });

  suite('#getList', function () {
    test('should return an array', function () {
      t.ok(_.isArray(loader.getList()));
    });

    test('should return an array of string', function () {
      loader.getList().forEach(function (v, i) {
        t.ok(_.isString(v), 'index ' + i);
      });
    });
  });

});
