# Turn crummy HTML into beautiful Javascript [![npm version](https://img.shields.io/npm/v/html2js-browserify.svg)](https://www.npmjs.com/package/html2js-browserify) [![npm](https://img.shields.io/npm/dm/html2js-browserify.svg)](https://www.npmjs.com/package/html2js-browserify) [![Build Status](https://travis-ci.org/featurist/html2js-browserify.svg?branch=master)](https://travis-ci.org/featurist/html2js-browserify)


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

## We're Hiring!
Featurist provides full stack, feature driven development teams. Want to join us? Check out [our career opportunities](https://www.featurist.co.uk/careers/).
