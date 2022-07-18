import mongoose from "mongoose";

export default async function create_pages_connect() {
  const connect = mongoose.createConnection("mongodb://150.158.50.217/pages");
  return connect;
}