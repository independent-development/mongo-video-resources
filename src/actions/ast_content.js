import fs from "fs";
import path from "path";
import { promisify } from "util";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const save_file_path = path.resolve(__dirname, "../../statics/script_content.js");

export async function ast_content() {
  const code_string = await promisify(fs.readFile)(save_file_path, "utf-8");
  const ast_result = parse(code_string);
  console.log("ast_result", ast_result);
};