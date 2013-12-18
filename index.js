var fs = require('fs');
var through = require('through');

function isHtml (file) {
    return /\.html$/.test(file);
}

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

function html2js(content) {
  return "module.exports = '" + escapeContent(content) + "';";
}

module.exports = function (file) {
    if (!isHtml(file)) return through();

    var data = '';
    return through(write, end);

    function write (buf) { data += buf }
    function end () {
        var content, src;
        try {
            content = fs.readFileSync(file, 'utf-8');
            src = html2js(content);
        } catch (error) {
            this.emit('error', error);
        }
        this.queue(src);
        this.queue(null);
    }
};
