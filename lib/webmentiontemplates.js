"use strict";

var fs = require('fs'),
  _ = require('lodash'),
  Promise = require('promise'),
  WebMentionTemplates;

WebMentionTemplates = function (options) {
  options = _.extend({
    templatePath : __dirname + '/../templates'
  }, options || {});

  this.options = options;
};

WebMentionTemplates.prototype.getTemplateNames = function () {
  if (this.templateNames) {
    return Promise.resolve(this.templateNames);
  }
  return Promise.denodeify(fs.readdir)(this.options.templatePath)
    .then(function (files) {
      return _(files).filter(function (file) {
          return file[0] !== '.';
        })
        .map(function (file) {
          return file.slice(0, 0 - '.html'.length);
        })
        .value();
    })
    .then(function (templateNames) {
      this.templateNames = templateNames;

      return templateNames;
    }.bind(this));
};

WebMentionTemplates.prototype.getTemplate = function (name, target, alternateTarget) {
  return Promise.denodeify(fs.readFile)(this.options.templatePath + '/' + name + '.html', {encoding: 'utf8'})
    .then(function (data) {
      data = data.replace(/http\:\/\/example\.com\/webmention\/target\/placeholder/g, target);
      if (alternateTarget) {
        data = data.replace(/http\:\/\/example\.com\/webmention\/target\/alternate/g, alternateTarget);
      }
      return data;
    });
};

module.exports = WebMentionTemplates;
