var fs = require('fs');
var through = require('through');
var htmlmin = require('html-minifier');

function isHtml (file) {
  return /\.html$/.test(file);
}

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

function html2js(content) {
  return "module.exports = '" + escapeContent(content) + "';";
}

module.exports = function (file, opts) {
  if (!isHtml(file)) return through();
  opts = opts || {};

  var data = '';
  return through(write, end);

  function write (buf) { data += buf }
  function end () {
    var content, src;
    try {
      content = fs.readFileSync(file, 'utf-8');
      if (opts.minify) content = htmlmin.minify(content, opts);
      src = html2js(content);
    } catch (error) {
      this.emit('error', error);
    }
    this.queue(src);
    this.queue(null);
  }
};
