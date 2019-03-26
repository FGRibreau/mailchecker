var cjson = require('cjson');
var converter = require('../lib/converter');
var tmp = require('tmp');

suite('Converter', function () {
  setup(function () {});

  suite('#toJson', function () {
    test('should return domain count', function () {
      var count = converter.toJson('test/list.test.txt', '/dev/null');
      count.should.equal(3);
    });

    test('should create valid json', function () {
      var jsonFilename = tmp.tmpNameSync();
      converter.toJson('test/list.test.txt', jsonFilename);
      json = cjson.load(jsonFilename);
      expected = [['one.com', 'two.org', 'three.net']];
      json.toString().should.equal(expected.toString());
    });
  });
});
