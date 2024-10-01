
import { MongoClient } from "mongodb"; // Mongodb package
import express from "express"; // ExpressJS for our server application
import fs from "fs"; // File system

// Setup variables// URI to mongodb server
const PORT = 3000; // PORT for our server to listen to
const app = express(); // Creating our express server

const uri = "mongodb+srv://dbuser:12345@cluster0.kpdg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB setup
const client = new MongoClient(uri); // Create client - Think of it as a live connection
await client.connect(); // Connect client to server
const database = client.db("books"); // Access the database on server
let soundsCollection = null; // Initial value of sounds collection

// Check if there is a collection with the name "sounds" already in the database
let sounds = await database.listCollections({}, { nameOnly: true }).toArray();
sounds.filter((collectionName) => {
  return collectionName === "sounds";
});

// If it doesnt exist, create it and seed with initial data
if (sounds.length == 0) {
  soundsCollection = await database.createCollection("sounds");

  // Get the data from the data.json file
  const filePath = "./data.json";
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileContent);

  // Loop through data and add frequency ke

  // Insert the data directly into the collection
  await soundsCollection.insertMany(jsonData);
} else {
  // Else return existing collection
  soundsCollection = await database.collection("sounds");
}