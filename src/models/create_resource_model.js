import { Schema } from "mongoose";

export const ResourceSchema = new Schema({
  name: { type: String },
  author_name: { type: String },
  view_num: { type: Number },
  category_name: { type: String },
  online_timestamp: { type: String },
  display_title: { type: String },
  sale_type: { type: Number },
  weight: { type: Number },
  source_type: { type: Number },
  cover_video: { type: String },
  is_prime: { type: Number },
  download_num: { type: Number },
  duration: { type: Number },
  display_tags: { type: Array },
  author_uid: { type: Number },
  rate: { type: Number },
  price: { type: Number },
  width: { type: Number },
  height: { type: Number },
  original_type: { type: Number },
  cover_image: { type: String },
  category: { type: Number },
  cover_video_list: { type: String },
  cover_image_list: { type: String },
  rate_name: { type: String },
  oss_url: { type: String },
  create_time: { type: Date }
});


export function create_resource_model(connect) {
  const ResourceModel = connect.model("resources_model", ResourceSchema);
  return ResourceModel;
};