var browserify = require('browserify');
var fs = require('fs');
var acorn = require('acorn');
var walk = require('acorn/dist/walk');
var html2js = require('..');

describe('html2js-browserify', function () {
  it('converts HTML into JS', function (done) {
    var b = browserify('./fixture.html', { basedir: __dirname });

    b.transform(html2js);
    b.bundle(function (err, bundle) {
      done(err || testExport(bundle, [
        '<!doctype html>',
        '<html>',
        '  <body class="bada">',
        '    <h1 class=\'bing\'>dude! \\r \\n \\ \\\\ \\\\\\</h1>',
        '  </body>',
        '</html>',
        ''
      ].join('\n')));
    });
  });

  it('passes options to html-minifier', function (done) {
    var b = browserify('./fixture.html', { basedir: __dirname });

    b.transform(html2js, { minify: true, collapseWhitespace: true });
    b.bundle(function (err, bundle) {
      done(err || testExport(bundle, [
        '<!doctype html>',
        '<html>',
        '<body class="bada">',

        // Note: html-minifier replaces simple quotes around attributes with
        // double quotes
        '<h1 class="bing">dude! \\r \\n \\ \\\\ \\\\\\</h1>',

        '</body>',
        '</html>'
      ].join('')));
    });
  });

  function testExport(bundle, expected) {
    var ast = acorn.parse(bundle);

    return !walk.findNodeAt(ast, null, null, function (type, node) {
      if (type !== 'AssignmentExpression') { return; }
      if (node.left.type !== 'MemberExpression') { return; }
      if (node.left.object.name !== 'module') { return; }
      if (node.left.property.name !== 'exports') { return; }
      if (node.right.type !== 'Literal') { return; }

      if (node.right.value !== expected) { return; }

      return true;
    }) && new Error('Unable to find exported string: ' + expected);
  }
});
