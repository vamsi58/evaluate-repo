const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");
const Question = require("../models/question");

const router = express.Router();

router.post("/add", (req, res, next) => {
    const question = new Question({
        quesid: req.body.quesid,
        questype: req.body.questype,
        quesCat: req.body.quesCat,
        quesSubCat: req.body.quesSubCat,
        question: req.body.question,
        quesFormatted: req.body.quesFormatted,
        answerOptions: req.body.quesAnswers,
        reason: req.body.reason
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
          message: "Invalid Here!"+err
        });
      });
  
});

router.get("/view", (req, res, next ) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const quesQuery = Question.find();
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

router.delete("/delete/:quesid", checkAuth, (req, res, next) => {
  Question.deleteOne({ quesid: req.params.quesid })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
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

router.get("/getQuestion/:quesid", (req, res, next) => {
  question.findById(req.params.quesid)
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

router.put("/update/:quesid", checkAuth, (req, res, next) => {
  const question = new Question({
      quesid: req.body.quesid,
      questype: req.body.questype,
      quesCat: req.body.quesCat,
      quesSubCat: req.body.quesSubCat,
      question: req.body.question,
      quesFormatted: req.body.quesFormatted,
      answerOptions: req.body.quesAnswers,
      reason: req.body.reason
  });
    question.updateOne({ quesid: req.params.quesid}, question)
      .then(result => {
        if (result.nModified > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate post!"
        });
      });
  }
);

module.exports = router;
