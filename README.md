# Turn crummy HTML into beautiful Javascript

    npm install html2js-browserify

## How?

some.html

    <html><body><h1>dude!</h1></body></html>

app.js

    var html = require('./some.html');
    console.log(html);

Then

    # browserify -t html2js-browserify app.js

## HTML Preprocessors (`jade`, `handlebar`, ...)

Do you write `jade` or anything instead of `html`? We got you covered.

You won't be able to use the CLI but instead have to run `browserify`
programmaticly so you can configure `html2js` to use your preprocessor.

Here is an example using `jade`:

```
var browserify   = require('browserify');
var html2js      = require('html2js-browserify');
var jade         = require('jade');
var fs           = require('fs');

html2js.configure({
  preprocessors:[
    {
      matches: function(file) {
        return /\.jade$/.test(file);
      },
      process: function(content){
        var fn = jade.compile(content);
        return fn({});
      }
    }
  ]
});

var b = browserify('./src/index.js');
b.transform(html2js);
b.bundle().pipe(fs.createWriteStream("./dist/index.js"));


```
