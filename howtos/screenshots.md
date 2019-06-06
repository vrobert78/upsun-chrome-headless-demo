## Goal

To use [Puppeteer](https://github.com/GoogleChrome/puppeteer) and [headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) to create an [ExpressJS](https://expressjs.com/) application that takes website screenshots on Platform.sh.

## Assumptions

You will need:

* An SSH key configured on your Platform.sh account
* The [Platform.sh CLI](https://docs.platform.sh/gettingstarted/cli.html) installed locally
* Node.js and `npm` installed locally

## Problems

Using headless Chrome to take screenshots of a website requires properly connecting the `chrome-headless` service container to the Node library [Puppeteer](https://github.com/GoogleChrome/puppeteer) by passing its credentials using the Node.js [Config Reader](https:/github.com/platformsh/config-reader-nodejs) libary.

## Steps

The project will ultimately have the following structure:

```bash
.
├── .platform
│   ├── routes.yaml
│   └── services.yaml
├── .platform.app.yaml
├── index.js
├── package.json
├── package-lock.json
└── screenshots.js
```

### 1. Initialize the project

Create an empty project on Platform.sh using the CLI.

```bash
$ platform create
```

Create a new project directory for the application on your local machine called `screenshots` and `cd` into it. Initialize the directory as a Git repository and set its remote to the newly created Platform.sh project using the outputted `project ID`.

```bash
$ git init
$ platform project:set-remote <project ID>
```

### 2. Create the Platform.sh configuration files

1. `.platform/services.yaml`

    Define the `chrome-headless` container using the supported version outlined in the [Headless Chrome documentation](https://docs.platform.sh/configuration/services/headless-chrome.html).
    
    ```yaml
    headless:
        type: chrome-headless:73
    ```

2. `.platform.app.yaml`

    Configure the application `nodejs`:
    
    ```yaml
    name: nodejs
    
    type: nodejs:10
    
    relationships:
      headless: "headless:http"
    
    crons:
      cleanup:
        spec: '*/30 * * * *'
        cmd: rm screenshots/*
    
    web:
      commands:
        start: "nodejs index.js"
    
    mounts:
      "/run": "shared:files/run"
      "/screenshots": "shared:files/screenshots"
    
    disk: 512
    ```
    
    The configuration uses `nodejs` 10, since it is required to use the Config Reader library with Puppeteer. It defines two mounts, `run` and `screenshots`. The first is created during build to run the application and the second will act as a writable directory to save the screenshots the application takes. 
    
    In order to prevent `screenshots/` from filling up as people use it, a `cron` job is also defined that removes its contents every 30 minutes. 

3. `.platform/routes.yaml`

    Lastly, set up a basic routes configuration file, using the name of the application `nodejs`
    
    ```yaml
    "https://{default}/":
        id: main
        type: upstream
        upstream: "nodejs:http"
    
    "https://www.{default}/":
        type: redirect
        to: "https://{default}/"
    ```

### 3. Write the `screenshots.js` file

Create a file in the project directory called `screenshots.js` with the following contents:

```
const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');

// Define a Config object and get credentials for chrome-headless
let config = platformsh.config();
const credentials = config.credentials('headless');

var exports = module.exports = {};

// Create an async function
exports.takeScreenshot = async function (url, screenshotID) {

    try {
        // Connect to chrome-headless using pre-formatted puppeteer credentials
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});

        // Open a new page to the given url and take the screenshot
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({
            fullPage: true,
            path: `screenshots/${screenshotID}.png`
        });

        await browser.close();

        return browser

    } catch (e) {
        return Promise.reject(e);
    }

};
```

It defines an `async` function called `takeScreenshot` as a module export. The Node.js Config Reader retrieves  the library's formatted credentials for Puppeteer to create the `formattedURL` string. 

`path` defines the saved location of the screenshot, while `fullPage` configures Puppeteer to take a screenshot of the entire page, not just the view seen within a window. Additional parameters for `page.screenshot()` can be found in the [Puppeteer documentation](https://pptr.dev/#?product=Puppeteer&version=v1.17.0&show=api-pagescreenshotoptions).

### 4. Define `index.js`

Create the file `index.js` that defines the ExpressJS application `app`:

```
const fs = require('fs');
const uuidv4 = require('uuid/v4')
const platformsh = require('platformsh-config');
const express = require('express');

// Require screenshot file and its function
var screenshot = require("./screenshots.js");

// Build the application
var app = express()

// Define the index route
app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
</head>
<body>

<h1>Headless Chrome on Platform.sh</h1>

<h2>Take a screenshot of a page</h2>

Click submit to generate a png or pdf of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/result">
    <input type="text" name="screenshotURL" value="https://platform.sh/">
    <input type="submit">
</form>

`);
    res.end(`</body></html>`);
})

// Define screenshot result route
app.get('/result', async function(req, res){
  // Create a randomly generated ID number for the current screenshot
  var screenshotID = uuidv4();
  // Take the screenshot
  await screenshot.takeScreenshot(req.query['screenshotURL'], screenshotID)
  // Define and download the file
  const file = `screenshots/${screenshotID}.png`;
  res.download(file);
});

// Create config object to get Platform.sh PORT credentials
let config = platformsh.config();

// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});

```

In addition to the home route, `index.js` defines a `/results` path that calls `takeScreenshot()` and passes a randomly generated ID that will become part of the name for the generated png file. 

### 5. Define the application's dependencies

Include the application's dependencies in `package.json`:

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
    "platformsh-config": "^2.0.0",
    "puppeteer": "^1.14.0",
    "express": "^4.16.4",
    "uuid": "^3.3.2"
  }
}
```

Then create the `package-lock.json` file by running

```bash
$ npm install
```

### 6. Push to Platform.sh

Commit the changes and push `master` to Platform.sh

```bash
$ git add .
$ git commit -m "Create screenshot application."
$ git push platform master
```

### 7. Verify

Use the command `platform url` when the build process has completed to visit the site. Click submit to take a screenshot of the Platform.sh website, or copy in another url to test the application.

![7a11418c-4325-4f1d-a149-5509011da2e5|666x500](upload://hOhYkuuh5DQFrSaG9maraQB38T5.png) 

## Conclusion

Using ExpressJS, Puppeteer, and Platform.sh headless Chrome as a service, a simple application can be made that takes screenshots of an inputted url.