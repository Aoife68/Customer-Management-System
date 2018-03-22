const mongoose = require("mongoose");

//Sidebar Schema
const SidebarSchema = mongoose.Schema({
  content:{
    type: String
  }
   //need to specify collection to use
}, {collection:'Sidebar'});

//Connect mongoose to user schema
const Sidebar = module.exports = mongoose.model('Sidebar', SidebarSchema);