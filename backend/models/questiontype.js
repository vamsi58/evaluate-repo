const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const questionTypeSchema = mongoose.Schema({
  questionTypeid: {type: number, required: true,unique:true },
  questionTypename: {type: String, required: true, unique:true }
  
});

questionTypeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("QuestionType", questionTypeSchema);
