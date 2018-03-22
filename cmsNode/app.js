const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require('./config/database');

//Connect to database
mongoose
  .connect(db.mongoURI)
  .then(() => console.log("Mongo DB Connected..."))
  .catch(err => console.log(err));

//Initialise Application
const app = express();

//JSON Prettify
app.set('json spaces', 40);

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//Set Routes
const pages = require('./routes/pages');
const users = require('./routes/users');
const sidebar = require('./routes/sidebar');

//Static Folder middleware
app.use(express.static(path.join(__dirname, 'public')));

//Use Routes
 app.use('/pages', pages);
 app.use('/users', users);
 app.use('/sidebar', sidebar);


//Set port
const port = process.env.PORT || 3000;

//Set up server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});