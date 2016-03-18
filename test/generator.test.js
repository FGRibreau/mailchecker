var t = require('assert');
var _ = require('lodash');
var Generator = require('../lib/generator');

suite('Generator', function () {
  setup(function () {
    // ...
  });

  suite('.getTemplatesSync', function () {
    test('should return an array', function () {
      t.ok(_.isArray(Generator.getTemplatesSync()));
    });

    test('should return an array of object', function () {
      Generator.getTemplatesSync().forEach(function (v) {
        t.ok(_.isPlainObject(v));
      });
    });
  });

  suite('.parsePath', function () {
    test('should parse specified path', function () {
      var fullpath = "/a/b/c/mailchecker/platform/php/mailchecker.tmpl.php";
      var r = Generator.parsePath(fullpath);
      r.should.eql({
        fullpath: fullpath,
        fullOutputPath: "/a/b/c/mailchecker/platform/php/mailchecker.php",
        dir: "/a/b/c/mailchecker/platform/php",
        template: "mailchecker.tmpl.php",
        output: "mailchecker.php"
      });

    });
  });

  suite('.getDomainList', function () {
    test('should return a non-empty list of lowercase strings', function () {
      var r = Generator.getDomainList();

      r.length.should.be.above(0);

      r.map(function (domain) {
        domain.should.eql(domain.toLowerCase());
      });
    });
  });

  suite('.getEmailRegexp', function () {
    test('should return the regexp', function () {
      var r = Generator.getEmailRegexp();

      r.should.eql(/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/);
    });
  });

  suite('.compile', function () {
    test('should compile all templates', function (tdone) {
      // Generator.on('*', function (template) {
      //   console.info(this.event, template.template);
      // });
      Generator.compile(function (err) {
        t.deepEqual(err, null);
        tdone();
      });
    });
  });
});
