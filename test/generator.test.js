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

  suite('.getEmailRegexp', function () {
    test('should return the regexp', function () {
      var r = Generator.getEmailRegexp();
      r.should.eql("/^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))$/i");
    });
  });

  suite('.compile', function () {
    test('should compile all templates', function (tdone) {
      // Generator.on('*', function(template){
      //   console.info(this.event, template.template);
      // });
      Generator.compile(function (err) {
        t.deepEqual(err, undefined);
        tdone();
      });
    });
  });
});
