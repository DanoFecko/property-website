const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/properties');

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


db = mongoose.connect("mongodb://localhost:27017/property-web-site?retryWrites=true&w=majority", {
  user: "pwsUser",
  pass: "QqWwEe12",
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
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/api/properties', propertyRoutes);


// app.post('/api/properties', (req, res, next) => {
//   const property = new propertyModel({
//     price: req.body.price,
//     location: req.body.location,
//     owner: req.body.owner,
//     size: req.body.size,
//     pictures: req.body.pictures,
//     status: req.body.status,
//     type: req.body.type
//   });
//   property.save().then(result => {
//     console.log(result);
//     res.status(201).json({
//       message: 'Property added successfully'
//     });
//   });
// });
//
// app.get('/api/properties', (req, res, next) => {
//   propertyModel.find().then((properties) => {
//     console.log(properties)
//     res.status(200).json({
//       properties: properties,
//       message: 'Properties Fetched Successfully',
//     });
//   });
// });
//
// app.get('/api/properties/:id', (req, res, next) => {
//   propertyModel.findById(req.params.id).then(property => {
//     if(property){
//       res.status(200).json({property: property});
//     }else{
//       res.status(484).json({message: 'Property not found'});
//     }
//   });
// });
//
// app.delete('/api/properties/:id', (req, res, next) => {
//   propertyModel.deleteOne({_id: req.params.id}).then(result => {
//     console.log(result);
//     res.status(200).json({
//       message: "Property deleted"
//     });
//   });
// });
//
// app.put('/api/properties/:id', (req, res, next) => {
//   const property = new propertyModel({
//     _id: req.body._id,
//     price: req.body.price,
//     location: req.body.location,
//     owner: req.body.owner,
//     size: req.body.size,
//     pictures: req.body.pictures,
//     status: req.body.status,
//     type: req.body.type
//   });
//   propertyModel.updateOne({_id: req.params.id}, property).then(result=> {
//     console.log(result);
//     res.status(200).json({message: "Update Successful!"})
//   })
//
// });

module.exports = app;
