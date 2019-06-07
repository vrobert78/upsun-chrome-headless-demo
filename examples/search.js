const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');

var exports = module.exports = {};

// Create an async function
exports.searchPage = async function (searchTerm) {

    try {

        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});

        // Open a new page to the given url and take the screenshot
        const page = await browser.newPage();
        await page.goto('https://developers.google.com/web/');

        // Type into search box.
        await page.type('#searchbox input', searchTerm);

        // Wait for suggest overlay to appear and click "show all results".
        const allResultsSelector = '.devsite-suggest-all-results';
        await page.waitForSelector(allResultsSelector);
        await page.click(allResultsSelector);

        // Wait for the results page to load and display the results.
        const resultsSelector = '.gsc-results .gsc-thumbnail-inside a.gs-title';
        await page.waitForSelector(resultsSelector);

        // Extract the results from the page.
        const links = await page.evaluate(resultsSelector => {
            const anchors = Array.from(document.querySelectorAll(resultsSelector));
            return anchors.map(anchor => {
                const title = anchor.textContent.split('|')[0].trim();
                return `${title} - ${anchor.href}`;
            });
        }, resultsSelector);

        await browser.close();

        return links.join('\n');

    } catch (e) {
        return Promise(e);
    }
}
