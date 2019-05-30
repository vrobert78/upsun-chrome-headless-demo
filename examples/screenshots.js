'use strict';

const platformsh = require('platformsh-config');

let config = platformsh.config();

const credentials = config.credentials('chrome');

const puppeteer = require('puppeteer');

(async() => {

  const browser = await puppeteer.connect({
    browserURL: "http://0.0.0.0:" + credentials.port
  });

//  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://platform.sh');
  await page.screenshot({path: 'screenshots/example.png'});
  await browser.close();
})();
