// import {Argument,Option} from "commander";
// import load_config from "@/utils/load_config";

import path from "path";
import moment from "moment";
import { red, green, yellow } from "colors";
import load_page from "@/scripts/load_page";

import { create_resource_model } from "@/models/create_resource_model";
import { create_task_error_model } from "@/models/create_task_error_model";

import get_video_buffer from "@/utils/get_video_buffer";
import { s3client_upload_file } from "@/utils/s3client_upload";
import create_resources_connect from "@/utils/create_resources_connect";
import create_task_error_connect from "@/utils/create_task_error_connect";

// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

export async function test_command() {
  const resource_connect = await create_resources_connect();
  const ResourceModel = await create_resource_model(resource_connect);

  const task_error_connect = await create_task_error_connect();
  const TaskErrorModel = new create_task_error_model(task_error_connect);

  const resource_list = await load_page();
  resource_list.map(async ({ display_title, cover_video, display_tags, id, original_id, _score, _self_score, ...otherAttr }) => {
    const resource_url = `https://video.shipin520.com/${cover_video}`;
    try {
      const filename = path.basename(cover_video);
      console.log(yellow("正在获取"), yellow(display_title));
      const video_buffer = await get_video_buffer(resource_url);
      const oss_url = await s3client_upload_file({ filename, filebuffer: video_buffer });
      const resource_model = new ResourceModel({
        name: filename, oss_url,
        display_tags: display_tags.split(","),
        create_time: moment().toDate(),
        ...otherAttr
      });
      console.log(await resource_model.save());
      console.log(green(display_title), green("已完成"));
    } catch (error) {
      console.log(red(display_title), resource_url, red(error.message));
      // const task_error_model = new TaskErrorModel({ display_title, cover_video, error_message: error.message });
      // console.log(await task_error_model.save());
      // console.log(display_title, "已完成");
    };
  });
};