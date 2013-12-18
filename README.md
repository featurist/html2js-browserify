# Turn crummy HTML into beautiful Javascript

some.html

    <html><body><h1>dude!</h1></body></html>

app.js

    var html = require('./some.html');
    console.log(html);

Then

    # browserify -t html2js-browserify app.js
