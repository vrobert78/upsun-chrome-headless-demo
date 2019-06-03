const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');

let config = platformsh.config();
const credentials = config.credentials('headless');

var exports = module.exports = {};

exports.makePDF = async function (url, pdfID) {

    try {

        const browserURL = 'http://' + credentials.ip + ':9222';
        const browser = await puppeteer.connect({browserURL: browserURL});

        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        await page.pdf({
            path: 'pdfs/' + pdfID + '.pdf',
            format: 'letter'
        });
        await browser.close();

        return browser

    } catch (e) {

        return Promise.reject(e);

    }

};
