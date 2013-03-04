var glob          = require("glob");
var async         = require("async");
var fs            = require("fs");
var p             = require("path");
var mu            = require('mu2');
var _             = require('lodash');
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

Generator.compile = function(fn){
  var templates = this.getTemplatesSync();
  var list      = loader.getList();
  var listJSON  = JSON.stringify(list);

  mu.clearCache();

  function iter(template, done){
    this.emit('compiling:template', template);
    var d = '';
    mu
      .compileAndRender(template.fullpath, {list:list, listJSON:listJSON})
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
