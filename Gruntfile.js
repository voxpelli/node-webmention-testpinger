"use strict";

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'lib/**/*.js'
      ],
      options: { jshintrc: '.jshintrc' }
    },
    lintspaces: {
      files: ['<%= jshint.files %>'],
      options: { editorconfig: '.editorconfig' }
    },
    watch: {
      jshint : {
        files: ['<%= jshint.files %>'],
        tasks: ['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['lintspaces', 'jshint']);
  grunt.registerTask('default', 'test');
};
