# Headless Chrome on Upsun.com
# Going Headless on Upsun.com

Upsun.com is proud to announce the availability of [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) as a service. When used in combination with the Node.js library [Puppeteer](https://github.com/GoogleChrome/puppeteer), you get a powerful new automated testing tool that allows you to:

* Easily generate PDFs and screenshots of your application, including emulating your site’s appearance on mobile devices.
* Crawl each page of an application, and potentially compare screenshots between branches to ensure new features do not result in changes to your UI.
*  Simulate user action. Puppeteer provides programmatic control over keyboard input, form completion, mouse position and clicks, so you could verify the checkout process of your eCommerce application end-to-end, for example.
* Monitor and verify that client-side Javascript and resource handling is working as you intended.

In this post, we'll show you how to configure Headless Chrome on a project, and then build an [ExpressJS](https://expressjs.com/) application that shows off some of the interesting new capabilities your applications can have with a headless browser at its disposal.

## Configuring Headless Chrome

Headless Chrome can be configured on an existing project on Upsun.com like any other of our maintained services. First define the `chrome-headless` container in your `.upsun/config.yaml`:

```yaml
services:
  headless:
      type: chrome-headless:120
```

along with a complementary relationship definition:

```
relationships:
 headless: "headless:http"
```

Using [Puppeteer](https://github.com/GoogleChrome/puppeteer) with the Upsun.com [Config Reader](https://github.com/platformsh/config-reader-nodejs) library requires that you use Node.js 10 or later

```
type: nodejs:20
```

and that both libraries are included in your `package.json` dependencies:

```
 "dependencies": {
   "platformsh-config": "^2.4.1",
   "puppeteer": "^21.6.1",
 }
```

If you're running a Node.js application, you're all set! Projects running with non-Node.js runtimes will have to additionally upgrade the current installation of Node.js, which can be done easily using the Node Version Manager and by following the instructions outlined in our [documentation](https://docs.upsun.com/languages/nodejs/node-version.html).

## Using Headless Chrome and Puppeteer

Now that we have configured Headless Chrome on Upsun.com, let's build something that uses Puppeteer!

### Generating PDFs

We're first going to create a simple Node.js application using the [ExpressJS](https://expressjs.com/) framework that generates a PDF of any URL that a user provides. We've already defined our service above, so let's define our application:

```yaml
applications:

  nodejs:

    type: nodejs:20

    relationships:
      headless: "headless:http"

    crons:
      cleanup:
        spec: '*/30 * * * *'
        cmd: rm pdfs/*

    web:
      commands:
        start: "node index.js"

    mounts:
      "/pdfs":
        source: tmp
        source_path: "pdfs/"
```

We define the mount `/pdfs`, which will become the writable directory our generated PDFs will be saved to, and a
`cron` job that empties that directory every thirty minutes.

#### Writing the ExpressJS application

We start our application by running `index.js`, so let's write one now that uses the ExpressJS framework. It defines an application `app` which uses `public/` as a static source for the application's stylesheet and `express-rate-limit` to set limits on the number of requests users can make to the site. It also requires the local file `/examples/pdfs.js`, which will actually use Puppeteer to generate PDFs - but more on that later.

```
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const rateLimit = require("express-rate-limit");
const platformsh = require('platformsh-config');

// Require local examples
var pdfs = require("./examples/pdfs.js");

// Build the application
var app = express();

// Define static source for css
app.use(express.static(__dirname + '/public'));

// Set rate limits
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'This demo permits 10 requests every 5 minutes. <br><br>You can try again later, or you can visit the <a href="https://docs.upsun.com/add-services/headless-chrome.html">Headless Chrome documentation</a> to configure the service on your own projects.'
});
// Apply to all requests
app.use(limiter);
```

Next, we can define what the front page will look like with a little HTML that provides an input field named `pdfURL` where users can provide a website URL to generate the PDF from.

```
// Define the index route content
app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Upsun.com</title>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

<h1>Headless Chrome on Upsun.com</h1>

<h2>Generate a PDF of a page (<a href="/pdfs/source">Source</a>)</h2>

<i>I need to generate PDFs of pages.</i></br></br>

Click 'Submit' to generate a PDF of the <a href="https://upsun.com/">Upsun.com website</a>, or paste in another URL.

</br></br>

<form method="get" action="/pdfs/result">
    <input type="text" name="pdfURL" value="https://upsun.com/">
    <input type="submit">
</form>

`);
    res.end(`</body></html>`);
})
```

We will have to define the route associated with the above form's action, `/pdfs/result`. It includes an async function that generates a random identifier that will be a part of the output PDF file name, and then passes that identifier with the `pdfURL` to another function within `/examples/pdfs.js` called `makePDF()`. The resulting file is then downloaded within the user's browser.

```
// Define PDF result route
app.get('/pdfs/result', async function(req, res){
  // Create a randomly generated ID number for the current PDF
  var pdfID = uuidv4();
  // Generate the PDF
  await pdfs.makePDF(req.query['pdfURL'], pdfID)
  // Define and download the file
  const file = `pdfs/${pdfID}.pdf`;
  res.download(file);
});
```

Finally, we use Config Reader to tell `app` which port it should be listening on:

```
// Get PORT and start the server
let config = platformsh.config();
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
```

#### Generating PDFs with Puppeteer

Now that our base application is written, let's use Puppeteer to generate PDFs in `examples/pdfs.js`:

```
const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');
var exports = module.exports = {};

// Create an async function
exports.makePDF = async function (url, pdfID) {
    try {
        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});
        // Open a new page
        const page = await browser.newPage();
        // Go to the page
        await page.goto(url, {waitUntil: 'networkidle2'});
        // Generate and save the PDF
        await page.pdf({
            path: `pdfs/${pdfID}.pdf`,
            printBackground: true
        });
        // Close the browser
        await browser.close();

        return browser

    } catch (e) {
        return Promise.reject(e);
    }
};
```

We can pass Config Reader's formatted credentials for Puppeteer as `browserURL` in `puppeteer.connect()` to connect to our Headless Chrome service container and instantiate a new headless browser. Then we can use Puppeteer to create a new page, visit the user-provided URL, and then call `page.pdf()` to generate a PDF of that site.

Here we also call two parameters: `path`, which saves the PDF with our unique identifier to the mount `pdfs/`, and `printBackground`, which is an optional parameter that will include the site's background images in the resulting file. Many more options are available within `page.pdf()`, so check the [documentation](https://pptr.dev/api/puppeteer.page.pdf/) for more details.

Our application can now receive a URL provided by a user and generate a PDF from it, but before we push to Upsun.com, we can add another interesting feature that comes with Headless Chrome: screenshots.

### Creating Screenshots with Puppeteer

First we can modify `config.yaml` with another mount where the screenshots will be saved

```yaml
    mounts:
      "/pdfs":
        source: tmp
        source_path: "pdfs/"
      "/screenshots":
        source: tmp
        source_path: "screenshots/"
```

and append our `cron` job to remove its files periodically like we did with `pdfs`

```yaml
    crons:
      cleanup:
        spec: '*/30 * * * *'
        cmd: rm pdfs/* && rm screenshots/*
```

In a file called `examples/screenshots.js` we can connect to Headless Chrome the same as before, but instead use `page.screenshot()` to take a screenshot of a given URL and save it to the new mount `screenshots/` with its own unique name.

```
const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');
const devices = puppeteer.devices;

var exports = module.exports = {};

// Create an async function
exports.takeScreenshot = async function (url, screenshotID, emulateMobile=false) {
    try {
        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});
        // Open a new page
        const page = await browser.newPage();
        // Emulate mobile device if selected
        if (emulateMobile) {
            await page.emulate(devices['iPhone 6']);
        }
        // Go to the page
        await page.goto(url);
        // Generate and save the PNG screenshot
        await page.screenshot({
            fullPage: true,
            path: `screenshots/${screenshotID}.png`
        });
        // Close the browser
        await browser.close();

        return browser

    } catch (e) {
        return Promise.reject(e);
    }
};
```

There are a few interesting new things happening here. First, `page.screenshot()` comes with its own set of parameters that can be modified. `fullPage` is set to `true`, which generates a PNG of the entire web page provided instead of just what is seen in a browser window. You can change the default image format from PNG to JPEG along with many other options described in the [`page.screenshot() documentation`](https://pptr.dev/api/puppeteer.page.screenshot_1/).

Second, we've included a new parameter in our exported function `takeScreenshot`: `emulateMobile`. If no value is provided, `takeScreenshot()` will create a full page PNG of the given URL. Otherwise, Puppeteer will use its `DeviceDescriptors` module to modify `browser` such that it emulates the view of the web page as it would appear on a mobile device using [`page.emulate()`](https://pptr.dev/next/api/puppeteer.page.emulate/), which in this case is an iPhone 6.

All we need to do to include this new feature in our application is to modify `index.js` to require the new module,

```
// Require locals
var pdfs = require("./examples/pdfs.js");
var screenshots = require("./examples/screenshots.js");
```

add a new form in our front page with an input field called `screenshotURL`,

```
<h2>Take a screenshot of a page (<a href="/screenshots/source">Source</a>)</h2>

<i>Does my site look like I intended it to?</i></br></br>

Click 'Submit' to create a screenshot of the <a href="https://upsun.com/">Upsun.com website</a>, or paste in another URL.

</br></br>

<form method="get" action="/screenshots/result">
    <input type="text" name="screenshotURL" value="https://upsun.com/">
    <input type="submit">
    </br></br>
    <i>How about on mobile devices?</i>
    </br></br>
    <label class="checkbox"><input type="checkbox" name="emulateMobile" value=true> Emulate mobile device</label><br>
</form>
```

and define the route for its result that calls `takeScreenshot()`

```
// Define Screenshots result route
app.get('/screenshots/result', async function(req, res){
  // Create a randomly generated ID number for the current screenshot
  var screenshotID = uuidv4();
  // Generate the screenshot
  await screenshots.takeScreenshot(req.query['screenshotURL'], screenshotID, req.query['emulateMobile'])
  // Define and download the file
  const file = `screenshots/${screenshotID}.png`;
  res.download(file);
});
```

### Deploy on Upsun.com

Define all of the dependencies in a `package.json`

```json
{
  "name": "chrome_headless",
  "version": "1.0.0",
  "description": "A simple example for taking screenshots with Puppeteer and headless Chrome on Platform.sh",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Chad Carlson",
  "license": "MIT",
  "dependencies": {
    "platformsh-config": "^2.4.1",
    "puppeteer": "^21.6.1",
    "express": "^4.18.2",
    "uuid": "^9.0.1",
    "express-rate-limit": "^7.1.5"
  }
}
```

Run `npm install` to generate a `package-lock.json`, commit the changes, and push to an empty project on Upsun.com.

That's it! When the build process has completed, we will have an ExpressJS application that uses Headless Chrome and Puppeteer to generate

* PDFs
* Full page screenshots
* Screenshots that emulate what the site would look like on a mobile device

for any URL that a user provides!



## Conclusion

Upsun.com makes it easy to install and use Headless Chrome into your projects without the need to install your own version of Chrome into the container as part of your builds. You can expand PDF generation into creating a tool that generates your application’s invoices, or [crawl each page](https://github.com/GoogleChromeLabs/puppeteer-examples/blob/master/crawlsite.js) of an application on your production and development branches to compare screenshots, and build complete visual regression testing into your workflow, blocking merges that would cause unwanted changes or distortions to the UI.

You can find the source code for this post on [GitHub](https://github.com/vrobert78/upsun-chrome-headless-demo), and for more information about Puppeteer and Headless Chrome, visit the resources below:

* [Upsun.com Headless Chrome documentation](https://docs.upsun.com/add-services/headless-chrome.html)
* [Puppeteer GitHub](https://github.com/puppeteer/puppeteer)
* [Puppeteer documentation](https://pptr.dev/)
* [Getting Started with Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)

