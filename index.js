const express = require("express");
var cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
require("dotenv").config()

const app = express();
// const port = process.env.PORT || 5600;
const port = process.env.PORT || 5600;



app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORDS}@cluster0.teacx.mongodb.net/${process.env.DB_VIEW}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  

  const Resort_Review = client.db("ResortReview").collection("review");

  const Resort_all = client.db("Resort_ALL").collection("all");

  const Resort_buy = client.db("Resort_buy").collection("buy");

  const Resort_admin = client.db("Resort_admin").collection("admin");

  

  app.get("/", (req, res) => {
    res.send("hlw i am excited to learning node");
  });

//   app.post("/addAll", (req, res) => {
//     const event = req.body;
    
    

//    Resort_all.insertMany(event, (err, result) => {
     
//       res.send({count:result})
//     });
//   });

  app.post("/addResort", (req, res) => {
    const event = req.body;

    Resort_all.insertMany(event, (err, result) => {
      res.send({ count: result });
    });
  });

  app.post("/addResortOne", (req, res) => {
    const event = req.body;

    Resort_all.insertOne(event, (err, result) => {
      res.send({ count: result });
    });
  });

  app.get("/addResort", (req, res) => {
    Resort_all.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.post("/ResortReview", (req, res) => {
    const form = req.body;

    Resort_Review.insertOne(form, (err, result) => {
      res.send({ count: result });
    });
  });

  app.get("/ResortReview", (req, res) => {
    Resort_Review.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.post("/Resortbuy", (req, res) => {
    const form = req.body;

    Resort_buy.insertOne(form, (err, result) => {
      res.send({ count: result });
    });
  });

  app.get("/Resortbuy", (req, res) => {
    Resort_buy.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/Resortbuy/:email", (req, res) => {
    email = req.params.email;

    Resort_buy.find({ email: email }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.delete(`/Resortbuydelete/:id`, (req, res) => {
    const id = req.params.id;

    Resort_buy.deleteOne({ _id: ObjectId(id) }, (err) => {
      if (!err) {
        res.send({ count: 1 });
      }
    });
  });

  app.delete(`/ResortdeleteProduct/:id`, (req, res) => {
    const id = req.params.id;

    Resort_all.deleteOne({ _id: ObjectId(id) }, (err) => {
      if (!err) {
        res.send({ count: 1 });
      }
    });
  });

  app.post("/ResortAdmin", (req, res) => {
    const form = req.body;

    Resort_admin.insertOne(form, (err, result) => {
      res.send({ count: result });
    });
  });

  app.get("/ResortAdmin1", (req, res) => {
    Resort_admin.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/ResortAdmin2/:email", (req, res) => {
    const email = req.params.email;

    Resort_admin.find({ email: email }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.patch("/ResortProcess/:id", (req, res) => {
    const id = req.params.id;

    Resort_buy.updateOne(
      { _id: ObjectId(id) },
      {
        $set: { value: "Shipped" },
      }
    ).then((result) => {
      res.send(result);
    });
  });

  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
