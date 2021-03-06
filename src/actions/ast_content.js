import fs from "fs";
import path from "path";
import { promisify } from "util";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const save_file_path = path.resolve(__dirname, "../../statics/script_content.js");

export async function ast_content(title) {
  const code_string = await promisify(fs.readFile)(save_file_path, "utf-8");
  const ast_result = parse(code_string);
  const VariableDeclaratorArray = [];
  traverse(ast_result, {
    VariableDeclarator: function (path) {
      VariableDeclaratorArray.push(generate(path.node).code);
    },
  });
  const result = `${VariableDeclaratorArray[0].replace("config = ", "")}`;
  const progressive = JSON.parse(result).request.files.progressive;
  const progressive_list = progressive.map(({ quality, mime, url }) => {
    return { quality, mime, url };
  });
  return { title, progressive_list };
};