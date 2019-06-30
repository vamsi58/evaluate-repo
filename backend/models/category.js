const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
  categoryid: {type: number, required: true,unique:true },
  categoryname: {type: String, required: true, unique:true }
  
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);
