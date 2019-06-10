// Modified from https://github.com/checkly/puppeteer-examples/blob/master/2.%20search/youtube.js
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const platformsh = require('platformsh-config');

var exports = module.exports = {};

// Create an async function
exports.takeScreenshot = async function (screenshotID, searchTerm) {

    try {
        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});

        // Open a new page to the given url and take the screenshot
        const page = await browser.newPage();
        await page.goto('https://youtube.com', {"waitUntil" : "networkidle0"})
        await page.type('#search', searchTerm)
        await page.click('button#search-icon-legacy')
        await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')
        await page.screenshot({
            fullPage: true,
            path: `screenshots/${screenshotID}.png`
        })

        await browser.close();

        return browser

    } catch (e) {
        return Promise.reject(e);
    }
};
