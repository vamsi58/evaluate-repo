const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");
const Question = require("../models/question");

const router = express.Router();

//Insert record
router.post("/add", (req, res, next) => {
  const question = new Question({
    quesid: req.body.quesid,
    questype: req.body.questype,
    quesCat: req.body.quesCat,
    quesSubCat: req.body.quesSubCat,
    question: req.body.question,
    quesFormatted: req.body.quesFormatted,
    answerOptions: req.body.quesAnswers,
    reason: req.body.quesReason,
    quesAproved: req.body.quesAproved,
    quesComplex: req.body.quesComplex
  });
  question
    .save()
    .then(result => {
      res.status(201).json({
        message: "Question created!",
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
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const filteredType = req.query.Type;
  const filteredCat = req.query.Cat;
  //const filteredSubCat = req.query.SubCat;
  var filteredSubCats = req.query.SubCat;

  var quesQuery;
  var whrCondition = {};

  if (filteredType !== ' ' && filteredType !== 'All') {
    whrCondition["questype"] = filteredType;
  }

  if (filteredCat !== ' ' && filteredCat !== 'All') {
    whrCondition["quesCat"] = filteredCat;
  }
  if ((req.query.SubCat).length > 0) {

  if (filteredSubCats !== ' ' && filteredSubCats !== 'All') {
    whrCondition["quesSubCat"] = {$in: filteredSubCats.split(",")};
    //q["$and"].push({ learningLanguages: {$in: req.body.learninglanguages.split(",") }});
  }
}
  console.log(whrCondition);
  quesQuery = Question.find(whrCondition);

  //  quesQuery = Question.find();  


  let fetchedQuestions;
  if (pageSize && currentPage) {
    quesQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  quesQuery
    .then(documents => {
      fetchedQuestions = documents;
      return Question.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Questions fetched successfully!",
        questions: fetchedQuestions,
        maxQuestions: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching questions failed!"
      });
    });
});

//Delete record
router.delete("/delete/:quesid", checkAuth, (req, res, next) => {
  Question.deleteOne({ quesid: req.params.quesid })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        Console.log(result.error);
        res.status(401).json({ message: "Not authorized!" });

      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Fetching posts failed!"

      });
    });
});

//View record by Id
router.get("/getQuestion/:quesid", (req, res, next) => {
  Question.findById(req.params.quesid)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Question not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Question failed!"
      });
    });
});

//Update record
router.put("/update/:id", checkAuth, (req, res, next) => {
  const question = new Question({
<<<<<<< HEAD
    _id: req.params.id,
    quesid: req.body.quesid,
    questype: req.body.questype,
    quesCat: req.body.quesCat,
    quesSubCat: req.body.quesSubCat,
    question: req.body.question,
    quesFormatted: req.body.quesFormatted,
    answerOptions: req.body.quesAnswers,
    reason: req.body.quesReason
=======
      _id: req.params.id,
      quesid: req.body.quesid,
      questype: req.body.questype,
      quesCat: req.body.quesCat,
      quesSubCat: req.body.quesSubCat,
      question: req.body.question,
      quesFormatted: req.body.quesFormatted,
      answerOptions: req.body.quesAnswers,
      reason: req.body.quesReason,
      quesAproved: req.body.quesAproved,
      quesComplex: req.body.quesComplex
>>>>>>> ba65bed0e6a319329c4492b96afeb5c8521a2f60
  });
  console.log(question);
  Question.updateOne({ _id: req.params.id }, question)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" + result });
      } else {
        res.status(401).json({ message: "Not authorized!" + req.params.id });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!" + error
      });
    });
}
);

module.exports = router;
