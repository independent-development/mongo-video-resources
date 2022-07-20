import { yellow } from "colors";
import puppeteer from "puppeteer";

import page_list_database from "@/utils/page_list_database";

import video_list_database from "./utils/video_list_database";
import video_count_database from "./utils/video_count_database";
import get_scripts_content from "./utils/get_scripts_content";

export async function fetch_video_list() {
  const video_key_list = await page_list_database.keys().value();
  const current_video_key = await video_count_database.get("current_video_key").value();
  for (let key = current_video_key || 0; key < video_key_list.length; key++) {
    console.log(yellow("当前索引值"), yellow(key));
    const video_title = video_key_list[key];
    const video_url = page_list_database.get(video_title).value();
    const browser = await puppeteer.launch({
      timeout: 0,
      headless: false,
      defaultViewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();
    try {
      await page.goto(video_url);
      const frame = await page.frames()[2];
      const bodyHandle = await frame.$("body>script");
      const script_content = await frame.evaluate(script => script.innerHTML, bodyHandle);
      await bodyHandle.dispose();
      const result = await get_scripts_content(script_content);
      await video_list_database.set(video_title, result).write();
      console.log(yellow(key), yellow("已完成!"));
    } catch (error) {
      console.log(video_title, "发生错误", error.message);
      process.exit(0);
    } finally {
      await page.close();
      await browser.close();
      await video_count_database.set("current_video_key", key).write();
    }
  }
};