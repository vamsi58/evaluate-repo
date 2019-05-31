const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching questions failed!"
      });
    });
});

module.exports = router;
