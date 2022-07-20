import cheerio from "cheerio";
import puppeteer from "puppeteer";

export default async function load_page(page_number) {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1920, height: 1080 },
    timeout: 0,
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(`https://www.vidsplay.com/page/${page_number}/`);
  try {
    const bodyHandle = await page.$(".section");
    const html = await page.evaluate((body) => (body.innerHTML), bodyHandle);
    await bodyHandle.dispose();
    const $ = cheerio.load(html);
    const collection = $(".overlay");
    const result = collection.map((index) => {
      return collection.eq(index).find(".grid-link").attr("href");
    });
    return result.get();
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await browser.close();
  }
};