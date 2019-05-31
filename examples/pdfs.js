const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');


let config = platformsh.config();
const credentials = config.credentials('headless');

const makePDF = async function () {

    try {

        const browserURL = 'http://' + credentials.ip + ':9222';
        const browser = await puppeteer.connect({browserURL: browserURL});

        const page = await browser.newPage();
        await page.goto('https://platform.sh', {waitUntil: 'networkidle2'});
        await page.pdf({
            path: 'pdfs/example.pdf',
            format: 'letter'
        });
        await browser.close();

        return browser

    } catch (e) {

        return Promise.reject(e);

    }

};

makePDF();