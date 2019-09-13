const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const courseSchema = mongoose.Schema({
  competenceid: {type: Number, required: true },
  courseid:{type: Number, required: true, unique:true},
  coursename: {type: String, required: true, unique:true }
  
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Course", courseSchema);
