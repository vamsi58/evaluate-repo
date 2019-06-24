const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const AnswerOptionSchema = require("./answer");

const QuestionSchema = mongoose.Schema({
  quesid:         { type: String},
  questype:       { type: String},
  quesCat:        { type: String},
  quesSubCat:     { type: String},
  question:       { type: String, minlength: 10, maxlength: 1000, required: true},
  quesFormatted:  { type: String, minlength: 10, maxlength: 1000},
  answerOptions:  { type: [AnswerOptionSchema], default: undefined,
                    validate: { validator: function(value) {return value && value.length === 4;},
                    message: 'Answer options should be 4.'}
                  }, 
  reason:         { type: String},
  quesAproved:    { type: Boolean},
  quesComplex:    { type: String}, 
  },
{
  timestamps: true
});

module.exports = mongoose.model("Question", QuestionSchema);
