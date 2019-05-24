const mongoose = require("mongoose");

export const AnswerOptionSchema = mongoose.Schema({
    optionNumber: {type: Number},
    answerBody: {type: String, minlength: 1, maxlength: 200,},
    isCorrectAnswer: { type: Boolean, default: false}
  }, {
    _id: false
  });