// import {Argument,Option} from "commander";
// import load_config from "@/utils/load_config";

import fs from "fs";
import path from "path";
import { promisify } from "util";
import puppeteer from "puppeteer";


// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

const save_file_path = path.resolve(__dirname, "../../statics/script_content.js");

export async function single_video_command() {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1920, height: 1080 },
    timeout: 0,
    headless: false
  });
  const page = await browser.newPage();
  await page.goto("https://www.vidsplay.com/aqua-ocean-sea/");
  const frame = await page.frames()[2];
  const bodyHandle = await frame.$("body>script");
  const script_content = await frame.evaluate(script => script.innerHTML, bodyHandle);
  await bodyHandle.dispose();
  await promisify(fs.writeFile)(save_file_path, script_content, "utf-8");
  // const ast_result = parse(script_content);
};