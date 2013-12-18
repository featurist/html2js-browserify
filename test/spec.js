var browserify = require('browserify');
var fs = require('fs');
var html2js = require('..');
require('chai').should();

describe('html2js-browserify', function () {
  beforeEach(function (done) {
    fs.writeFile(__dirname + '/testFile.js', "var html = require('./testFile.html');result(html);", function (error) {
      if (error) done(error);

      fs.writeFile(__dirname + '/testFile.html', "<html><body class=\"bada\"><h1 class='bing'>dude!</h1></body></html>", function (error) {
        if (error) done(error);

        done();
      });
    });
  });

  afterEach(function (done) {
    fs.unlink(__dirname + '/testFile.js', function () {
      fs.unlink(__dirname + '/testFile.html', function () {
        done();
      });
    });
  });

  it('converts html into js', function (done) {
    var b = browserify(__dirname + '/testFile.js');
    b.transform(html2js);
    b.bundle({}, function (error, bundle) {
      if (error) {
        done(error);
      } else {
        function result(html) {
          html.should.equal("<html><body class=\"bada\"><h1 class='bing'>dude!</h1></body></html>");
          done();
        }
        var f = eval(bundle);
      }
    });
  });
});
