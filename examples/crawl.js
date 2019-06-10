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

 /**
  * Discovers all the pages in site or single page app (SPA) and creates
  * a tree of the result in ./output/<site slug/crawl.json. Optionally
  * takes screenshots of each page as it is visited.
  *
  * Usage:
  *   node crawlsite.js
  *   URL=https://yourspa.com node crawlsite.js
  *   URL=https://yourspa.com node crawlsite.js --screenshots
  *
  * Then open the visualizer in a browser:
  *   http://localhost:8080/html/d3tree.html
  *   http://localhost:8080/html/d3tree.html?url=../output/https___yourspa.com/crawl.json
  *
  *Start Server:
  *   node server.js
  *
  */

const fs = require('fs');
const del = require('del');
const util = require('util');
const puppeteer = require('puppeteer');
const sharp = require('sharp');
const platformsh = require('platformsh-config');

var exports = module.exports = {};

// Create an async function
exports.crawlSite = async function (url) {

    try {
        // Connect to chrome-headless using pre-formatted puppeteer credentials
        let config = platformsh.config();
        const formattedURL = config.formattedCredentials("headless", "puppeteer");
        const browser = await puppeteer.connect({browserURL: formattedURL});

        var depth = 2;

        const crawledPages = new Map();



        await browser.close();

        return browser

    } catch (e) {
        return Promise.reject(e);
    }
};
