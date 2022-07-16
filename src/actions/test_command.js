// import {Argument,Option} from "commander";
import load_config from "@/utils/load_config";

import create_connect from "@/utils/create_connect";
import { create_resource_model } from "@/models/create_resource_model";

// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

export async function test_command() {
  const connect = await create_connect();
  const ResourceModel = await create_resource_model(connect);
  const resource_model = new ResourceModel({ name: "sdasaad", oss_url: "https://www.google.com/" });
  console.log(await resource_model.save());
};