/**
 * @name Amazon search
 *
 * @desc Looks for a "nyan cat pullover" on amazon.com, goes two page two clicks the third one.
 */
const puppeteer = require('puppeteer')
const screenshot = 'amazon_nyan_cat_pullover.png'
try {
  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://docs.platform.sh/')
    await page.type('#search', 'headless chrome')
    await page.screenshot({path: screenshot})
    await browser.close()
  })()
} catch (err) {
  console.error(err)
}