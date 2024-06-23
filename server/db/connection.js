import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://avirit:avirit123@data225.frouvcq.mongodb.net/?retryWrites=true&w=majority&appName=Data225";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect().then()
  // Send a ping to confirm a successful connection
} catch(err) {
  console.error(err);
}

let db = client.db("users");

export default db;