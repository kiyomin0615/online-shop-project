const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("online-shop");
}

function getDatabase() {
  if (!database) {
    throw new Error("No Database Connected!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDatabase: getDatabase,
};
