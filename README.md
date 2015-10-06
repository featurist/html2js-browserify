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

## Options

* `minify` if set to true, will minify the HTML. All other options are passed through to [html-minifier](https://github.com/kangax/html-minifier).

    ```sh
    browserify -t [html2js-browserify --minify --collapseWhitespace] app.js
    ```
