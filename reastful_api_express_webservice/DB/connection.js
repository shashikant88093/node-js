// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME || 'mydb';

// Reuse a single client across app lifecycle
let client;
let db;

async function connectToDatabase() {
  if (db) return db;

  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to your .env file.');
  }

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    // Reasonable connection options
    maxPoolSize: 10,
    minPoolSize: 0,
    connectTimeoutMS: 10000,
    retryWrites: true,
  });

  await client.connect();

  // Optional: ping
  await client.db('admin').command({ ping: 1 });

  db = client.db(dbName);
  console.log(`✅ Connected to MongoDB Atlas. DB = ${dbName}`);
  return db;
}

async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('🔌 MongoDB connection closed.');
  }
}

module.exports = { connectToDatabase, closeDatabase };