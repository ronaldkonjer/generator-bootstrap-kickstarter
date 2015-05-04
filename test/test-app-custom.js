'use strict';

var path = require('path'), // reference to the built in path module
  assert = require('yeoman-generator').assert, // create the yeoman assert object
  helpers = require('yeoman-generator').test, // create the yeoman test generator
  os = require('os'), // create the yeoman test generator
  _s = require('underscore.string'),
  should = require('should'), // This means you can utilize libraries such as should.js
  fs = require('fs'),
  escapeStringRegexp = require('escape-string-regexp');

describe('Bootstrap kickstart', function() {
  //not testing the actual run of generators yet
  it('the generator can be required without throwing', function() {
    this.app = require('../app');
  });

  describe('run test', function() {
    var expectedContent = [
      ['bower.json', /"name": "tmp"/],
      ['package.json', /"name": " tmp"/]
    ];
    var expected = [
      '.bowerrc',
      '.editorconfig',
      '.gitignore',
      '.jshintrc'
      'package.json',
      'bower.json',
      'README.md',
      'Gruntfile.js',
      'humans.txt',
      'LICENSE',
      'CONTRIBUTING.md',
      'assets',
      'assets/fonts',
      'assets/img',
      'assets/js/base.js',
      'assets/js/module.js'
    ];

    // Mock options passed in
     var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

  })
})