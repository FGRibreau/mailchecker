'use strict';
var glob = require("glob");
var async = require("async");
var fs = require("fs");
var p = require("path");
var mu = require('mu2');
var _ = require('lodash');
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var multiline = require('multiline');
var loader = require("./loader");

var Generator = new EventEmitter2({
  wildcard: true
});

Generator.DIR = p.resolve(__dirname, '../platform');

Generator.getTemplatesSync = function () {
  return glob.sync(p.resolve(this.DIR, './*/*.tmpl.*')).map(this.parsePath);
};

Generator.parsePath = function (fullpath) {
  var dir = p.dirname(fullpath);
  var output = p.basename(fullpath).replace('.tmpl', '');
  return {
    fullpath: fullpath,
    fullOutputPath: p.resolve(dir, output),
    dir: dir,
    template: p.basename(fullpath),
    output: output
  };
};

// Extracted from validator
var emailRegexp = multiline(function () {
  /*
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
*/
}).trim();

Generator.getEmailRegexp = _.partial(_.identity, emailRegexp);

Generator.compile = function (fn) {
  var templates = this.getTemplatesSync();
  var regexp = this.getEmailRegexp();
  var list = loader.getList();
  var listJSON = JSON.stringify(list);
  var listSTR = listJSON.substring(1, listJSON.length - 1);

  mu.clearCache();
  this.emit('loaded:list', list);

  function iter(template, done) {
    var d = '';
    this.emit('compiling:template', template);

    mu
      .compileAndRender(template.fullpath, {
        regexp: regexp,
        list: list,
        listSTR: listSTR,
        listJSON: listJSON
      })
      .on('data', function (data) {
        d += data;
      })
      .on('end', function () {
        this.emit('writing:template', template);
        fs.writeFile(template.fullOutputPath, d, done);
      }.bind(this))
      .on('error', function (err) {
        this.emit('error:template', template, err);
        done(err);
      });
  }

  async.eachLimit(templates, 5, iter.bind(this), fn);
};


module.exports = Generator;
