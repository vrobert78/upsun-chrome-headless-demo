const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const platformsh = require('platformsh-config');

let config = platformsh.config();
const credentials = config.credentials('headless');

var exports = module.exports = {};

exports.emulateScreenshot = async function (url, screenshotID) {

    try {
        const browserURL = 'http://' + credentials.ip + ':9222';
        const browser = await puppeteer.connect({browserURL: browserURL});

        const page = await browser.newPage();
        await page.emulate(devices['iPhone 6']);
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
