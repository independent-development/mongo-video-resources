import { Schema } from "mongoose";

export const ResourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  oss_url: { type: String },
  create_time: { type: Date }
});


export function create_resource_model(connect) {
  const ResourceModel = connect.model("ResourceModel", ResourceSchema);
  const resource_model = new ResourceModel();
  return resource_model;
};