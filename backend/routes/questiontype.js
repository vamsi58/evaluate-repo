const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");
const QuestionType = require("../models/questiontype");

const router = express.Router();

//Insert record
router.post("/add", (req, res, next) => {
  const questiontype = new QuestionType({
    //questionTypeid: QuestionType.find().max(questionTypeid) + 1 , 
    questionTypeid: req.body.id,
    questionTypename: req.body.name

  });
  console.log(questiontype);

  questiontype
    .save()
    .then(result => {
      res.status(201).json({
        message: "QuestionType created!",
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

  var questypeQuery;
  questypeQuery = QuestionType.find();


  let fetchedQuestionTypes;

  questypeQuery
    .then(documents => {
      fetchedQuestionTypes = documents;
      return QuestionType.count();
    })
    .then(count => {
      res.status(200).json({
        message: "QuestionTypes fetched successfully!",
        questionTypes: fetchedQuestionTypes
        //maxQuestions: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching questiontypes failed!" + error
      });
    });
});

//Get Max record Id
router.get("/getMaxid", (req, res, next) => {
  //QuestionType.findById(req.params.quesid)
  var maxIdquery;
  maxIdquery = QuestionType.aggregate([{ $group: {_id: null, maxId: { $max: "$questionTypeid" } } }]);

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