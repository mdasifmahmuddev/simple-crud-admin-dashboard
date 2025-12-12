const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://mdasifmahmuddev_db_user:9sA7fwt60wvRYoly@mdasifmahmuddev.ycldbcx.mongodb.net/?appName=mdasifmahmuddev";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let noticesCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("nebs_it_db");
    noticesCollection = db.collection("notices");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

app.post('/api/notices', async (req, res) => {
  try {
    const notice = {
      ...req.body,
      createdAt: new Date(),
      status: 'Published'
    };
    const result = await noticesCollection.insertOne(notice);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/notices', async (req, res) => {
  try {
    const notices = await noticesCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/notices/:id', async (req, res) => {
  try {
    const result = await noticesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});