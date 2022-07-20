import low from "lowdb";
import path from "path";
import FileSync from "lowdb/adapters/FileSync";

const database_path = path.resolve(__dirname, "../../../databases/video_list.json");
const adapter = new FileSync(database_path);
const database = low(adapter);

export default database;