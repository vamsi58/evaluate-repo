const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const competenceSchema = mongoose.Schema({
  competenceid: {type: Number, required: true,unique:true },
  competencename: {type: String, required: true, unique:true }
  
});

competenceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("CompetenceArea", competenceSchema);
