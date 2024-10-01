const express = require('express');
const bodyParser = require('body-parser');
const fs=require("fs");
const app = express();
const port = 3000;
const uri = "mongodb+srv://dbuser:12345@cluster0.kpdg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 

 const { MongoClient } = require('mongodb');

 const client = new MongoClient(uri);
 
 async function run() {
   try {
     await client.connect();
     const db = client.db('sampels');
     const collection = db.collection('books');

     let bookscollection =NULL;
     let books = await database.listCollections({}, { nameOnly: true }).toArray();
    books.filter((collectionName) => {
        return collectionName === "books";
});
 
if (books.length == 0) {
    booksCollection = await database.createCollection("books");
  } else {

    booksCollection = await database.collection("books");
  }
     
  if (books.length == 0) {
    booksCollection = await database.createCollection("books");
  

    const filePath = "./data.json";
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    jsonData.forEach((item) => {
      item.frequency = "High frequency";
    });
  
    await booksCollection.insertMany(jsonData);
  } else {
    booksCollection = await database.collection("books");
  }
}
  app.get("/", async (req, res) => {
    try {
      const data = await booksCollection.find().toArray();
      res.json(data);
    } catch (error) {
      console.error("Failed to retrieve documents:", error);
      res.status(500).send("Error retrieving data from the database");
    }
  });

const bookRouter = require('./routers/bookRouter.js');
app.use('/books', bookRouter);

app.get('/', (req, res) => {
    res.send("hello")
});





app.listen(port, async () => {
    console.log(`Server is running on port http:/localhost/${port}`);
});




