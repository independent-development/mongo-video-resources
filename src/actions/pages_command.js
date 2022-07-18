// import {Argument,Option} from "commander";
// import load_config from "@/utils/load_config";

import { yellow } from "colors";
import save_single_page from "@/scripts/save_single_page";
import page_count_database from "@/utils/page_count_database";

// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

export async function pages_command() {
  const record_page_number = await page_count_database.get("current_page_number").value();
  for (let current_page_number = record_page_number || 1; current_page_number <= 25; current_page_number++) {
    try {
      console.log(yellow("当前页数是第"), current_page_number, yellow("页"));
      await save_single_page(current_page_number);
      console.log(yellow("=============================================="));
    } catch (error) {
      console.log("error", error);
      process.exit(0);
    } finally {
      await page_count_database.set("current_page_number", current_page_number).write();
    }
  }
};