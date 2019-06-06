const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');

// Define a Config object and get credentials for chrome-headless
//let config = platformsh.config();
//const credentials = config.credentials('headless');

var exports = module.exports = {};

// Create an async function
exports.takeScreenshot = async function (url, screenshotID, emulateMobile=false) {

    try {
        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});

        // Open a new page to the given url and take the screenshot
        const page = await browser.newPage();

        if (emulateMobile) {
            await page.emulate(devices['iPhone 6']);
        }

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