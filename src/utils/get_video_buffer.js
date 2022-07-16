import axios from "axios";
import httpinvoke from "httpinvoke";

export default async function get_video_buffer(video_url) {
  const { data: result_buffer } = await axios({
    method: "GET",
    url: video_url,
    responseType: "arraybuffer"
  });
  return result_buffer;
};