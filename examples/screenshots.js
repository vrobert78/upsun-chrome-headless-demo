'use strict';


const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');
let config = platformsh.config();

const credentials = config.credentials('chrome');

(async() => {

  const browser = await puppeteer.connect({
    browserWSEndpoint: "ws://169.254.199.59:9222/devtools/browser/e8d1f39a-c94f-4337-b585-8721337a080a",
//    browserURL: "http://" + credentials.host + ":" + credentials.port
  });

  const page = await browser.newPage();
  await page.goto('http://platform.sh');
  await page.screenshot({path: 'screenshots/example.png'});
  await browser.close();
})();
