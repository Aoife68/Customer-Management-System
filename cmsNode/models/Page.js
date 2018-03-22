const mongoose = require("mongoose");

//Page Schema
const PageSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  slug:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  sidebar:{
    type: String,
    required: true
  },
});

//Connect mongoose to user schema
const Page = module.exports = mongoose.model('Page', PageSchema);