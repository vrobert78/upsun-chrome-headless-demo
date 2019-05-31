'use strict';


const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');
let config = platformsh.config();

const credentials = config.credentials('chrome');

(async() => {

  const browser = await puppeteer.connect({
    browserURL: "http://" + credentials.host + ":" + credentials.port
  });

  const page = await browser.newPage();
  await page.goto('http://platform.sh');
  await page.screenshot({path: 'screenshots/example.png'});
  await browser.close();
})();
