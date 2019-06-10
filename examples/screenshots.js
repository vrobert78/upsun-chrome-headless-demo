const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const platformsh = require('platformsh-config');

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
