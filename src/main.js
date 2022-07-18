import { program } from "commander";
import { name, version } from "@@/package.json";

import { ast_content } from "@/actions/ast_content";
import { pages_command } from "@/actions/pages_command";
import { single_video_command } from "@/actions/single_video_command";
import { create_config_file } from "@/actions/create_config_file";

program
  .usage(name)
  .version(version)

program
  .command("init")
  .description("创建运行时配置文件")
  .action(create_config_file);

program
  .command("ast")
  .description("测试AST语法树")
  .action(ast_content);

program
  .command("pages")
  .description("这是测试命令")
  .action(pages_command);

program
  .command("single")
  .description("测试爬取iframe中的内容")
  .action(single_video_command)

program.parse();





