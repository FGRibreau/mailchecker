var glob          = require("glob");
var async         = require("async");
var fs            = require("fs");
var p             = require("path");
var mu            = require('mu2');
var _             = require('lodash');
var validators    = require('validator/lib/validators');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

var loader = require("./loader");

var Generator = new EventEmitter2({wildcard: true});

Generator.DIR = p.resolve(__dirname, '../platform');

Generator.getTemplatesSync = function(){
  return glob.sync(p.resolve(this.DIR, './*/*.tmpl.*')).map(this.parsePath);
};

Generator.parsePath = function(fullpath){
  var dir    = p.dirname(fullpath);
  var output = p.basename(fullpath).replace('.tmpl','');
  return {
    fullpath: fullpath,
    fullOutputPath:p.resolve(dir, output),
    dir: dir,
    template:p.basename(fullpath),
    output:output
  };
};

Generator.getEmailRegexp = function(){
  var s = 'str.match(';
  var e = ');';
  var fn = validators.isEmail.toString();
  return fn.substring(fn.indexOf(s)+s.length, fn.indexOf(e));
};

Generator.compile = function(fn){
  var templates = this.getTemplatesSync();
  var regexp    = this.getEmailRegexp();
  var list      = loader.getList();
  var listJSON  = JSON.stringify(list);
  var listSTR   = listJSON.substring(1, listJSON.length-1);

  mu.clearCache();

  function iter(template, done){
    var d = '';
    this.emit('compiling:template', template);

    mu
      .compileAndRender(template.fullpath, {
        regexp:regexp,
        list:list,
        listSTR:listSTR,
        listJSON:listJSON
      })
      .on('data', function(data){
        d += data;
      })
      .on('end', function(){
        this.emit('writing:template', template);
        fs.writeFile(template.fullOutputPath, d, done);
      }.bind(this))
      .on('error', function(err){
        this.emit('error:template', template, err);
        done(err);
      });
  }

  async.eachLimit(templates, 5, iter.bind(this), fn);
};


module.exports = Generator;
