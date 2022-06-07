import { Db, MongoClient, MongoClientOptions } from "mongodb";

const MONGODB_URI = `mongodb://mongodb:27017`;
// const MONGODB_URI = process.env.MONGODB_CONN_STRING;
const MONGODB_DB = `test`;
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environment variable");
}

if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }
  interface options extends MongoClientOptions {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  }

  // set the connection options
  const opts: options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  if (MONGODB_URI) {
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
      client: cachedClient,
      db: cachedDb,
    };
  }
}
