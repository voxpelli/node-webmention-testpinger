"use strict";

module.exports = {
  WebMentionTemplates : require('./webmentiontemplates')
};

if (require.main === module) {
  require('./cli');
}
