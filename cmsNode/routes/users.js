const express =require('express');
const router = express.Router();

//Get Page Model
const UserModel = require('../models/User');

//POST register
router.post('/register', (req, res) => {
  
  //Assign username and password from Form values
  let username = req.body.username;
  let password = req.body.password;

  //findOne where username == username
  UserModel.findOne({username: username},(err,user)=> {
    if(err){
      res.send(err);
    }

    if(user){
      //boolean defined in register components ts file - check carried out in same file
      res.json('userExists');
    } else {

      //create new user
      let user = new UserModel({
        username: username,
        password:password
      });

      //save user
      user.save((err) => {
        if(err){
          res.send(err);
        } else{
          res.json("user registered");
        }
        
      });
    }
    
  });
});

//Get a single page
router.get('/:slug', (req, res) => {
  let slug = req.params.slug;

  PageModel.findOne({slug: slug},(err,page)=> {
    if(err){
      res.send(err);
    }
    res.json(page);
  });
});


//POST login
router.post('/login', (req, res) => {
  
  //Assign username and password from Form values
  let username = req.body.username;
  let password = req.body.password;

  //findOne by username and password
  UserModel.findOne({username: username, password:password},(err,user)=> {
    if(err){
      res.send(err);
    }

    if(user){
      res.json(username);
    } else {
      res.json("invalidLogin");     
    }    
  });
});

//Get a single page
router.get('/:slug', (req, res) => {
  let slug = req.params.slug;

  PageModel.findOne({slug: slug},(err,page)=> {
    if(err){
      res.send(err);
    }
    res.json(page);
  });
});



//Export Router
module.exports = router;