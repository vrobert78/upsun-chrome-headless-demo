'use strict';

const platformsh = require('platformsh-config');

let config = platformsh.config();

const credentials = config.credentials('chrome');

const puppeteer = require('puppeteer');

(async() => {

  const browser = await puppeteer.launch({
    // Launch chromium using a proxy server on port 9876.
    // More on proxying:
    //    https://www.chromium.org/developers/design-documents/network-settings
    args: [
      '--proxy-server=' + credentials.ip + ':' + credentials.port,
      // Use proxy for localhost URLs
      '--proxy-bypass-list=<-loopback>',
    ]
  });


//  const browser = await puppeteer.connect({
//    browserURL: "http://" + credentials.host + ":" + credentials.port
//  });

//  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://platform.sh');
  await page.screenshot({path: 'screenshots/example.png'});
  await browser.close();
})();
