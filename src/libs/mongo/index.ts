import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;

if (!URI) throw new Error("Please add Mongo URI to .env");

const client = new MongoClient(URI, {});

const DBClient = client.db("ShopApp");

export default DBClient;
