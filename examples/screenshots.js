const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');


let config = platformsh.config();
const credentials = config.credentials('headless');

const takeScreenshot = async function (url) {

    console.log(url)

    try {

        const browserURL = 'http://' + credentials.ip + ':9222';
        const browser = await puppeteer.connect({browserURL: browserURL});

        const page = await browser.newPage();
        await page.goto('https://platform.sh');
        await page.screenshot({path: 'screenshots/example.png'});

        await browser.close();

        return browser

    } catch (e) {

        return Promise.reject(e);

    }

};

//takeScreenshot();
