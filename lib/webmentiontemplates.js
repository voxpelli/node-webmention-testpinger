'use strict';

const fs = require('fs');
const _ = require('lodash');
const denodeify = require('denodeify');
const pathModule = require('path');

const WebMentionTemplates = function (options) {
  options = _.extend({
    templatePath: pathModule.join(__dirname, '../templates')
  }, options || {});

  this.options = options;
};

WebMentionTemplates.prototype.getTemplateNames = function () {
  if (this.templateNames) {
    return Promise.resolve(this.templateNames);
  }
  return denodeify(fs.readdir)(this.options.templatePath)
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

WebMentionTemplates.prototype.getTemplate = function (name, target, options) {
  if (_.isString(options)) {
    options = { alternateTarget: options };
  }

  options = options || {};

  return denodeify(fs.readFile)(this.options.templatePath + '/' + name + '.html', {encoding: 'utf8'})
    .then(function (data) {
      data = data.replace(/http:\/\/example\.com\/webmention\/target\/placeholder/g, target);
      if (options.alternateTarget) {
        data = data.replace(/http:\/\/example\.com\/webmention\/target\/alternate/g, options.alternateTarget);
      }
      if (options.commentUrl) {
        data = data.replace(/http:\/\/example\.com\/webmention\/comment/g, options.commentUrl);
      }
      return data;
    });
};

module.exports = WebMentionTemplates;
