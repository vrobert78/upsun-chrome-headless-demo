const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');
var exports = module.exports = {};

// Create an async function
exports.makePDF = async function (url, pdfID) {
    try {
        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});
        // Open a new page
        const page = await browser.newPage();
        // Go to the page
        await page.goto(url, {waitUntil: 'networkidle2'});
        // Generate and save the PDF
        await page.pdf({
            path: `pdfs/${pdfID}.pdf`,
            printBackground: true
        });
        // Close the browser
        await browser.close();

        return browser

    } catch (e) {
        return Promise.reject(e);
    }
};
