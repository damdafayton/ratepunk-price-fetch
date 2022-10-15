import puppeteer from "puppeteer";

import { getAgodaUrl } from "./src/getAgodaUrl.js";
import { sampleData } from "./src/sampleData.js";
import { saveResponse } from "./src/saveResponse.js";

const agodaUrl = getAgodaUrl(sampleData);

console.log({ agodaUrl });

(async () => {
  const browser = await puppeteer.launch({ headless: !false });

  const page = await browser.newPage();

  await page.goto(agodaUrl, { waitUntil: "domcontentloaded" });

  const selector = ".LowestPriceYouSeen";

  await page.waitForSelector(selector);

  const response = await page.evaluate((selector) => {
    const dataset = document.querySelector(selector).dataset;
    return Object.fromEntries(Object.entries(dataset));
  }, selector);

  const { currentPrice } = response;

  console.log({ currentPrice });
  console.log(
    "Despite setting currency type, price is always returned in USD. There is need for another API for price conversion"
  );

  saveResponse(currentPrice);

  await browser.close();
  return currentPrice;
})();
