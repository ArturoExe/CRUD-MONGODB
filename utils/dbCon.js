import { connect, connection } from "mongoose";

import mongoose from "mongoose";

mongoose.set("strictQuery", true);

let isConnected = {
  isConnected: false,
};

export async function connectDb() {
  if (isConnected.isConnected) return;

  const db = await connect(process.env.MONGODBURL, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = db.connections[0].readyState;
  console.log(isConnected);
}

connection.on("connected", () => {
  console.log("Is connected");
});

connection.on("error", (err) => {
  console.log(err);
});
