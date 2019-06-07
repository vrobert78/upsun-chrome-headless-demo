/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author ebidel@ (Eric Bidelman)
 */

// Curl a page and dump its markup.

const puppeteer = require('puppeteer');
const platformsh = require('platformsh-config');

var exports = module.exports = {};

// Create an async function
exports.getPageSource = async function (url) {

    try {

        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});

        // Go to page and retrieve source text
        const page = await browser.newPage();
        const response = await page.goto(url);
        var pageSource = await response.text();

        await browser.close();

        return pageSource;

    } catch (e) {
        return Promise.reject(e);
    }
}
