const express = require("express");
const propertyModel = require("../models/property");

const router = express.Router();

router.post('', (req, res, next) => {
  const property = new propertyModel({
    price: req.body.price,
    location: req.body.location,
    owner: req.body.owner,
    size: req.body.size,
    pictures: req.body.pictures,
    status: req.body.status,
    type: req.body.type
  });
  property.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Property added successfully'
    });
  });
});

router.get('', (req, res, next) => {
  propertyModel.find().then((properties) => {
    console.log(properties)
    res.status(200).json({
      properties: properties,
      message: 'Properties Fetched Successfully',
    });
  });
});

router.get('/:id', (req, res, next) => {
  propertyModel.findById(req.params.id).then(property => {
    if(property){
      res.status(200).json({property: property});
    }else{
      res.status(484).json({message: 'Property not found'});
    }
  });
});

router.delete('/:id', (req, res, next) => {
  propertyModel.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Property deleted"
    });
  });
});

router.put('/:id', (req, res, next) => {
  const property = new propertyModel({
    _id: req.body._id,
    price: req.body.price,
    location: req.body.location,
    owner: req.body.owner,
    size: req.body.size,
    pictures: req.body.pictures,
    status: req.body.status,
    type: req.body.type
  });
  propertyModel.updateOne({_id: req.params.id}, property).then(result=> {
    console.log(result);
    res.status(200).json({message: "Update Successful!"})
  })

});

module.exports = router;
