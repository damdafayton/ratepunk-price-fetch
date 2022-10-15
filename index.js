import puppeteer from "puppeteer";

import { getAgodaUrl } from "./src/getAgodaUrl.js";
import { sampleData } from "./src/sampleData.js";
import { saveResponse } from "./src/saveResponse.js";

const agodaUrl = getAgodaUrl(sampleData);

console.log({ agodaUrl });

(async () => {
  const browser = await puppeteer.launch({ headless: !false });
  console.log({ browserAgent: await browser.userAgent() });
  const page = await browser.newPage();

  await page.goto(agodaUrl, { waitUntil: "domcontentloaded" });

  const selector = ".LowestPriceYouSeen";

  await page.waitForSelector(selector);

  // const inner_html = await page.$eval(selector, (element) => element.innerHTML);
  const response = await page.evaluate((selector) => {
    const dataset = document.querySelector(selector).dataset;
    return Object.fromEntries(Object.entries(dataset));
  }, selector);

  const { currentPrice } = response;

  console.log({ currentPrice });

  saveResponse(currentPrice);

  await browser.close();
  return currentPrice;
})();
