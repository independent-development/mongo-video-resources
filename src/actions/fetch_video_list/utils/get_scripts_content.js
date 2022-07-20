import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

export default async function get_scripts_content(code_string) {
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
  return progressive_list;
};