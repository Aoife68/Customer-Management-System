const express = require("express");
const router = express.Router();

//Get Page Model
const PageModel = require("../models/Page");

//Get All pages
router.get("/", (req, res) => {
  PageModel.find({}, (err, pages) => {
    if (err) {
      res.send(err);
    }
    res.json(pages);
  });
});

//Get a single page
router.get("/:slug", (req, res) => {
  let slug = req.params.slug;

  PageModel.findOne({ slug: slug }, (err, page) => {
    if (err) {
      res.send(err);
    }
    res.json(page);
  });
});

//POST Add page
router.post("/add/page", (req, res) => {
  //Assign username and password from Form values
  let title = req.body.title;
  let slug = req.body.title.replace(/\s+/g, "-").toLowerCase();
  let content = req.body.content;
  let hasSidebar = req.body.hasSidebar;
  let sidebar = (hasSidebar) ? "yes" : "no";


  //findOne by username and password
  PageModel.findOne({ slug: slug }, (err, page) => {
    if (err) {
      res.send(err);
    }

    if (page) {
      res.json("pageExists");
    } else {
      //save the new page
      let page = new PageModel({
        title: title,
        slug: slug,
        content: content,
        sidebar: sidebar
      });
      page.save(err => {
        if (err) {
          res.send(err);
          res.json("ok");
        }
      });
    }
  });
});

//Get edit page
router.get("/edit/page/:id", (req, res) => {
  let id = req.params.id;
  PageModel.findById(id, (err, page) => {
    if (err) {
      res.send(err);
    }
    res.json(page);
  });
});

//POST Edit page
router.post("/edit/page/:id", (req, res) => {
  let id = req.params.id;

  let title = req.body.title;
  let slug = req.body.title.replace(/\s+/g, "-").toLowerCase();
  let content = req.body.content;
  let hasSidebar = req.body.hasSidebar;
  let sidebar = (hasSidebar) ? "yes" : "no";

  //Validation on edit ($ne - not equal to)
  PageModel.findOne({ slug: slug, _id: { $ne: id } }, (error, pg) => {
    if (error) res.send(error);
    if (pg) {
      res.json("pageExists");
    } else {
      
      //findOne by username and password
      PageModel.findById(id, (err, page) => {
        if (err) {
          res.send(err);
        }
          //edit the values
          page.title = title;
          page.slug = slug;
          page.content = content;
          page.sidebar = sidebar;

          page.save(err => {
            if (err) {
              res.send(err);
              res.json("editProblem");
            } else {
              res.json("ok");
            }
          });        
      });
    }
  });
});

//Get Delete page
router.get("/delete/page/:id", (req, res) => {
  let id = req.params.id;

  PageModel.findByIdAndRemove(id, (err, page) => {
    if (err) {
      res.send(err);
      res.json("error");
    } else {
      res.json("ok");
    }
  });
});

//Export Router
module.exports = router;
