var fs = require('fs');
var through = require('through');

var defaults = {
    preprocessors:[]
};

function isHtml (file) {
    return /\.html$/.test(file);
}

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

function html2js(content) {
  return "module.exports = '" + escapeContent(content) + "';";
}

function preprocessorFor(file) {
    var matching_preprocessor = null;
    defaults.preprocessors.forEach(function(preprocessor){
        if (preprocessor.matches(file)) matching_preprocessor = preprocessor;
    });
    return matching_preprocessor;
}

module.exports = function (file) {

    var preprocessor = preprocessorFor(file);

    if (!isHtml(file) && !preprocessor) return through();

    var data = '';
    return through(write, end);

    function write (buf) { data += buf }
    function end () {
        var content, src;
        try {
            var raw_content = fs.readFileSync(file, 'utf-8');
            content = preprocessor ? preprocessor.process(raw_content) : raw_content;
            src = html2js(content);
        } catch (error) {
            this.emit('error', error);
        }
        this.queue(src);
        this.queue(null);
    }
};

module.exports.configure = function(options){
    if(options && options.preprocessors) {
        defaults.preprocessors = options.preprocessors
    }
}
