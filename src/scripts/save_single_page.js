import url from "url";
import { red, green } from "colors";

import load_page from "@/utils/load_page";
import page_list_database from "@/utils/page_list_database";

export default async function save_single_page(page_number) {
  const resource_list = await load_page(page_number);
  const mission_task = resource_list.map(async (page_url) => {
    const { pathname } = url.parse(page_url);
    const resource_name = pathname.replace(/^\//ig, "").replace(/\/$/ig, "");
    try {
      await page_list_database.set(resource_name, page_url).write();
      console.log(green(resource_name), green("已完成"));
    } catch (error) {
      console.log(red(resource_name), page_url, red(error.message));
    };
  });
  return Promise.all(mission_task);
};