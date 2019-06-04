const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');

let config = platformsh.config();
const credentials = config.credentials('headless');


function puppeteerFormatter(credentials) {
	return `http://${credentials["ip"]}:${credentials["port"]}`;
}

// Call this in setup.
config.registerFormatter("puppeteer", puppeteerFormatter);


var exports = module.exports = {};

exports.takeScreenshot = async function (url, screenshotID) {

    try {
//        const browserURL = 'http://' + credentials.ip + ':9222';
//        const browserURL = `http://${credentials.ip}:${credentials.port}`;
        const formattedURL = config.FormattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});

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
