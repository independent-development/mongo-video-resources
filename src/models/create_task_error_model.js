import { Schema } from "mongoose";

export const TaskErrorSchema = new Schema({
  display_title: { type: String },
  cover_video: { type: String },
  error_message: { type: String }
});


export function create_task_error_model(connect) {
  const TaskErrorModel = connect.model("task_error_model", TaskErrorSchema);
  return TaskErrorModel;
};