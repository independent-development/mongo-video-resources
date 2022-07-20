import mongoose from "mongoose";

export default async function create_task_error_connect() {
  const connect = mongoose.createConnection("mongodb://150.158.50.217/task_error");
  return connect;
}