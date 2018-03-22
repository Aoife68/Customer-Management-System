const express = require("express");
const router = express.Router();

//Get Sidebar Model
const SidebarModel = require("../models/Sidebar");

//Get edit sidebar
router.get("/edit/sidebar", (req, res) => {
  //hardcoded id from db
  let id = "5aa7f721f36d28207a6f059f";

  SidebarModel.findById(id, (err, sidebar) => {
    if (err) {
      res.send(err);
    }
    res.json(sidebar);
  });
});

//POST Edit Sidebar
router.post("/edit/sidebar", (req, res) => {
  //hardcoded id from db
  let id = "5aa7f721f36d28207a6f059f";

  SidebarModel.findById(id, (err, sidebar) => {
    if (err) {
      res.send(err);
    }

    sidebar.content = req.body.content;

    sidebar.save(err => {
      if (err) {
        res.send(err);
        res.json("sidebarProblem");
      } else {
        res.json("ok");
      }
    });

    // res.json(sidebar);
  });
});

//Export Router
module.exports = router;
