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
      quesAnswers: req.body.quesAnswersAnswers
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
          message: "Invalid !"+err
        });
      });
  
});

router.post("/view", (req, res, next ) => {
  let fetchedQuestion;
   Question.find({ })
    .then(question => {
      if (!question) {
        return res.status(401).json({
          message: "Question not found"+question
        });
      }
      fetchedQuestion = question;
      console.log(fetchedQuestion);
      })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "failed"
        });
      }
    //   const token = jwt.sign(
    //     { quesid: fetchedQuestion.quesid, userId: fetchedUser._id },
    //     "secret_this_should_be_longer",
    //     { expiresIn: "1h" }
    //   );
    //   res.status(200).json({
    //     token: token,
    //     expiresIn: 3600,
    //     userId: fetchedUser._id
    //   });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
});

module.exports = router;
