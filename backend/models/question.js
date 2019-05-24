const mongoose = require("mongoose");
// import { AnswerOptionSchema } from './answer-option-schema';
import { AnswerOptionSchema } from './answer';
const uniqueValidator = require("mongoose-unique-validator");

export const QuestionSchema = mongoose.Schema({
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
  Reason:         { type: String},
  },
{
  timestamps: true
});

export const Question = mongoose.model('Question', QuestionSchema);
