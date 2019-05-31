const debug = require('debug')('snap');

const {promisify} = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);

const puppeteer = require('puppeteer');

const http = require('http');

const util = require('util');
const dns = require('dns');
const lookup = util.promisify(dns.lookup);

const platformsh = require('platformsh-config');
let config = platformsh.config();

const credentials = config.credentials('headless');



const getBrowser = async function () {

    try {

//        const browser = await puppeteer.launch();
        const browserURL = 'ws://' + config.ip + ':9222';

        console.log(browserURL);

//        const browser = await puppeteer.connect({ browserWSEndpoint: browserURL });
        const browser = await puppeteer.connect({ browserURL: ${browserURL} });

        console.log(browser);

        const page = await browser.newPage();
        await page.goto('https://platform.sh');

//        console.log(await page.content());
        await page.screenshot({path: 'screenshots/example.png'});

        await browser.close();

    } catch (e) {

        return Promise.reject(e);

    }

};

getBrowser();


//
//    try {
//
//        const getBrowser = async function () {
//
//        const browser = await puppeteer.launch();
//        browserURL = 'ws://' + config.ip + ':9222';
//        await puppeteer.connect({ browserWSEndpoint: browserURL });
//
//        const page = await browser.newPage();
//        await page.goto('https://platform.sh');
//
//        console.log(await page.content());
//        await page.screenshot({path: 'screenshots/example.png'});
//
//        await browser.close();
//
//    } catch (e) {
//
//        return Promise.reject(e);
//
//    }
//
//};



//
//var options = {
//    width: 1280,
//    height: 800,
//    scaleFactor: 2,
//    fullPage: false,
//    defaultBackground: true,
//    timeout: 60, // The Puppeteer default of 30 is too short
//    delay: 0,
//    debug: false,
//    browserURL: false,
//    ...options
//  };
//
//
//
//let globalBrowser = null;
//
//const getBrowser = async function () {
//
//    if (!globalBrowser) {
//
//        try {
//
//            const ip = await lookup(options.browserURL.hostname);
//            const browserURL = `http://${ip.address}:${options.browserURL.port}`;
//
//            console.log(ip)
//            console.log(browserURL)
//
//            const browser = await puppeteer.connect({browserURL: browserURL})
////
//////            const ip2 = await lookup(credentials.host);
//////            debug(ip2.address);
////
////            const browerURL = "http://" + config.ip + ":9222";
////
////            const browser = await puppeteer.connect({
//////                browserWSEndpoint: "ws://" + config.ip + ":9222/devtools/browser/e8d1f39a-c94f-4337-b585-8721337a080a",
////                browserURL: "http://" + config.ip + ":9222"
////            });
//
//
//        } catch (e) {
//            return Promise.reject(e)
//        }
//
//    }
//
//};
//
//
//getBrowser();


// From talk https://www.youtube.com/watch?v=7-XnEMrQnn4
// TAKE A SCREENSHOT

//puppeteer.launch().then(async browser => {
//    const page = await browser.newPage();
//    await page.goto('https://example.com');
//    await page.screenshot({path: 'screenshots/example.png'})
//
//    await browser.close();
//})
//


//
//  const getBrowser = async function () {
//    if (!globalBrowser) {
//
//      if (!options.browserURL) {
//        debug('Launch LOCAL Chromium');
//        try {
//          globalBrowser = await puppeteer.launch();
//          debug('Chromium launched')
//        } catch (e) {
//          return Promise.reject(e);
//        }
//
//      } else {
//        debug('Launch REMOTE Chromium');
//        try {
//          const ip = await lookup(options.browserURL.hostname);
//          const browserURL = `http://${ip.address}:${options.browserURL.port}`;
//          debug(`browserURL: ${browserURL}`);
//          globalBrowser = await puppeteer.connect({browserURL});
//          debug('Chromium launched')
//        } catch (e) {
//          return Promise.reject(e);
//        }
//      }
//
//      globalBrowser.on('disconnect', () => {
//        globalBrowser = null;
//        debug('Close the Chromium browser');
//      });
//
//    } else {
//      debug('Reuse existing Chromium browser');
//    }
//
//    return globalBrowser;
//  };
//
//
//
//
//
//
////
////module.exports = (options) => {
////
////  options = {
////    width: 1280,
////    height: 800,
////    scaleFactor: 2,
////    fullPage: false,
////    defaultBackground: true,
////    timeout: 60, // The Puppeteer default of 30 is too short
////    delay: 0,
////    debug: false,
////    browserURL: false,
////    ...options
////  };
////
////  const timeoutMilliseconds = options.timeout * 1000;
////
////  const viewportOptions = {
////    width: options.width,
////    height: options.height,
////    deviceScaleFactor: options.scaleFactor
////  };
////
////  const screenshotOptions = {};
////
////  let globalBrowser = null;
////
////  /**
////   * Browser as a sort-of-singleton: the function either creates a browser,
////   * or returns an existing one. As a bonus level -- it handles crashes
////   * of Chromium.
////   *
////   * @returns {Promise<*>}
////   */
////  const getBrowser = async function () {
////    if (!globalBrowser) {
////
////      if (!options.browserURL) {
////        debug('Launch LOCAL Chromium');
////        try {
////          globalBrowser = await puppeteer.launch();
////          debug('Chromium launched')
////        } catch (e) {
////          return Promise.reject(e);
////        }
////
////      } else {
////        debug('Launch REMOTE Chromium');
////        try {
////          const ip = await lookup(options.browserURL.hostname);
////          const browserURL = `http://${ip.address}:${options.browserURL.port}`;
////          debug(`browserURL: ${browserURL}`);
////          globalBrowser = await puppeteer.connect({browserURL});
////          debug('Chromium launched')
////        } catch (e) {
////          return Promise.reject(e);
////        }
////      }
////
////      globalBrowser.on('disconnect', () => {
////        globalBrowser = null;
////        debug('Close the Chromium browser');
////      });
////
////    } else {
////      debug('Reuse existing Chromium browser');
////    }
////
////    return globalBrowser;
////  };
////
////  const createSnapshot = async function (url, path, authentication) {
////    debug('Take a new snapshot of: ' + url);
////
////    // Throws an error.
////    // @todo: proper logging, then catch and return an error 500 image.
////    const browser = await getBrowser();
////    const page = await browser.newPage();
////
//
//(async() => {
//
//  const browser = await puppeteer.connect({
//    browserWSEndpoint: "ws://169.254.199.59:9222/devtools/browser/e8d1f39a-c94f-4337-b585-8721337a080a",
////    browserURL: "http://" + credentials.host + ":" + credentials.port
//  });
//
//  const page = await browser.newPage();
//  await page.goto('http://platform.sh');
//  await page.screenshot({path: 'screenshots/example.png'});
//  await browser.close();
//})();
