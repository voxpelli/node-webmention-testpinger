'use strict';

const fs = require('fs');
const denodeify = require('denodeify');
const pathModule = require('path');

const WebMentionTemplates = function (options) {
  options = Object.assign({
    templatePath: pathModule.join(__dirname, '../templates')
  }, options || {});

  this.options = options;
};

WebMentionTemplates.prototype.getTemplateNames = function () {
  if (this.templateNames) {
    return Promise.resolve(this.templateNames);
  }
  return denodeify(fs.readdir)(this.options.templatePath)
    .then(files => files.filter(file => file[0] !== '.'))
    .then(files => files.map(file => file.slice(0, 0 - '.html'.length)))
    .then(templateNames => {
      this.templateNames = templateNames;

      return templateNames;
    });
};

WebMentionTemplates.prototype.getTemplate = function (name, target, options) {
  if (typeof options === 'string') {
    options = { alternateTarget: options };
  }

  options = options || {};

  return denodeify(fs.readFile)(this.options.templatePath + '/' + name + '.html', {encoding: 'utf8'})
    .then(data => {
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
