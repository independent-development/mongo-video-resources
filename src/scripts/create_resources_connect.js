import mongoose from "mongoose";

export default async function create_resources_connect() {
  const connect = mongoose.createConnection("mongodb://150.158.50.217/resources");
  return connect;
}