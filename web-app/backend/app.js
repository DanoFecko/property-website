const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const propertyModel = require('./models/property');
const mongoose = require('mongoose');

const properties = [
  {
    id: '324234',
    price: 10000,
    location: 'Lubotice',
    owner: '42354545',
    size: 35,
    pictures: [],
    status: true,
    type: 'HOUSE'
  },
  {
    id: '646456',
    price: 200000,
    location: 'Brno',
    owner: '42354545',
    size: 100,
    pictures: [312312, 323244],
    status: true,
    type: 'APARTMENT'
  }
];

app.use(bodyParser.json());

db = mongoose.connect('mongodb://localhost/property-web-site?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to DB");
}).catch(() => {
  console.log("Connection to DB Failed");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.post('/api/properties', (req, res, next) => {
  const property = new propertyModel({
    price: req.body.price,
    location: req.body.location,
    owner: req.body.owner,
    size: req.body.size,
    pictures: req.body.pictures,
    status: req.body.status,
    type: req.body.type
  });
  property.save();
  console.log(property);
  res.status(201).json({
    message: 'Property added successfully'
  });
  next();
});

app.get('/api/properties', (req, res, next) => {
  //propertyModel.find();
  res.status(200).json({
    properties: properties,
    message: 'Properties Fetched Successfully',
  });
  // console.log('fetched properties');
  next();
});

module.exports = app;
