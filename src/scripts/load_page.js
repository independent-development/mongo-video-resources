import axios from "axios";
// import cheerio from "cheerio";
// import { promisify } from "util";
// import httpinvoke from "httpinvoke";

export default async function load_page() {
  const { data: { result } } = await axios({
    method: "GET",
    url: "https://shipin520.com/v1/search?=&=&=all&=&filters=&e=&=&=100&=100",
    params: {
      es: "",
      kid: "",
      word: "",
      order: "",
      type: "all",
      filters: "",
      p_page: 2,
      p_limit: 100,
      sale_type: 100,
    }
  });
  return result.data.list;
};