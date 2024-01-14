// OzKHOz2cHw98lqvW
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(express.json());
app.use(cors());

// xKyr89juQROVlgWo

app.get("/", (req, res) => {
  res.send("Betterlife server is running");
});

const uri =
  "mongodb+srv://radiationcorporation2:xKyr89juQROVlgWo@cluster0.tzfvevy.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const blogCollection = client.db("betterlife").collection("blog");
    const individualCollection = client
      .db("betterlife")
      .collection("individual");
    const babyCollection = client.db("betterlife").collection("baby");
    const othersCollection = client.db("betterlife").collection("others");
    const partnerCollection = client.db("partner").collection("others");
    const visitCollection = client.db("betterlife").collection("view");
    app.get("/api/visits", async (req, res) => {
      try {
        const visitDocument = await visitCollection.findOne();
        const count = visitDocument ? visitDocument.count : 0;
        res.json({ count });
      } catch (error) {
        console.error("Error fetching visit count:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/api/visits/increment", async (req, res) => {
      try {
        let visitDocument = await visitCollection.findOne();
        if (!visitDocument) {
          visitDocument = { count: 50 };
          await visitCollection.insertOne(visitDocument);
        }

        visitDocument.count += 5;
        console.log(visitDocument.count);
        await visitCollection.updateOne(
          {},
          { $set: { count: visitDocument.count } }
        );

        console.log(visitDocument.count);

        res.json({ count: visitDocument.count });
      } catch (error) {
        console.error("Error incrementing visit count:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // get method for finding the specific userProperty
    app.get("/blogs", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = blogCollection.find(query);
      const ticket = await cursor.toArray();
      res.send(ticket);
    });
    // get method for finding the specific user only
    app.get("/users", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = userCollection.find(query);
      const ticket = await cursor.toArray();
      res.send(ticket);
    });
    app.post("/addBlog", async (req, res) => {
      const review = req.body;
      const result = await blogCollection.insertOne(review);

      res.send(result);
    });
    app.post("/individual", async (req, res) => {
      const review = req.body;
      const result = await individualCollection.insertOne(review);

      res.send(result);
    });
    app.post("/baby", async (req, res) => {
      const review = req.body;
      const result = await babyCollection.insertOne(review);

      res.send(result);
    });
    app.post("/others", async (req, res) => {
      const review = req.body;
      const result = await othersCollection.insertOne(review);

      res.send(result);
    });
    app.post("/partner", async (req, res) => {
      const review = req.body;
      const result = await partnerCollection.insertOne(review);

      res.send(result);
    });
    // post method for adding user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // find details with id information
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.findOne(query);
      res.send(result);
    });
    //delete property if he want
    app.delete("/myReviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await propertyCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
