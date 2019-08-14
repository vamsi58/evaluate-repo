const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");
const CompetenceArea = require("../models/competencearea");

const router = express.Router();

//Insert record
router.post("/add", (req, res, next) => {
  const competencearea = new CompetenceArea({
    
    competenceid: req.body.id,
    competencename: req.body.name

  });
  console.log(competencearea);

  competencearea
    .save()
    .then(result => {
      res.status(201).json({
        message: "Competence Area created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Invalid Here!" + err
      });
    });

});

//View all records
router.get("/view", (req, res, next) => {

  var competenceQuery;
  competenceQuery = CompetenceArea.find();


  let fetchedCompetences;

  competenceQuery
    .then(documents => {
        fetchedCompetences = documents;
      return CompetenceArea.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Competence Area fetched successfully!",
        competences: fetchedCompetences
        
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Competences failed!" + error
      });
    });
});

//Get Max record Id
router.get("/getMaxid", (req, res, next) => {
 
  var maxIdquery;
  maxIdquery = CompetenceArea.aggregate([{ $group: {_id: null, maxId: { $max: "$competenceid" } } }]);

  maxIdquery.then(document => {
    if (document) {
      console.log(document);
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: "Max id not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Max id failed!" + error
      });
    });
  //console.log(maxId);
});


module.exports = router;