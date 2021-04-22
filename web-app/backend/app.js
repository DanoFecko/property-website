const express = require('express');
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/properties", (req, res, next) => {
  const property = req.body;
  console.log(property);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/properties', (req, res, next) => {
  const posts = [
    {
      id: 324234,
      price: 10000,
      location: 'Lubotice',
      owner: 42354545,
      size: 35,
      pictures: [],
      status: true,
      type: 1
    },
    {
      id: 646456,
      price: 200000,
      location: 'Brno',
      owner: 42354545,
      size: 100,
      pictures: [312312, 323244],
      status: true,
      type: 2
    }
  ];

  res.status(200).json({
    message: 'Properties Fetched Successfully',
    posts: posts
  });
});

module.exports = app;
