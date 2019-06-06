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

        // Open a new page to the given url and create the PDF
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        await page.pdf({
            path: `pdfs/${pdfID}.pdf`,
            format: 'letter',
            printBackground: true
        });
        await browser.close();

        return browser

    } catch (e) {
        return Promise.reject(e);
    }
};
