import { Schema } from "mongoose";

export const PagesSchema = new Schema({
  resource_name: { type: String },
  page_url: { type: String },
  create_time: { type: Date }
});


export function create_pages_model(connect) {
  const PagesModel = connect.model("pages_model", PagesSchema);
  return PagesModel;
};