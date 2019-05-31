const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');


let config = platformsh.config();
const credentials = config.credentials('headless');

const getBrowser = async function () {

    try {

        const browserURL = 'http://' + credentials.ip + ':9222';
        const browser = await puppeteer.connect({browserURL: browserURL});

        const page = await browser.newPage();
        await page.goto('https://google.com');
        await page.screenshot({path: 'screenshots/example.png'});

        await browser.close();

    } catch (e) {

        return Promise.reject(e);

    }

};

getBrowser();
