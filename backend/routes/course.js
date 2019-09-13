const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");
const Course = require("../models/course");

const router = express.Router();

//Insert record
router.post("/add", (req, res, next) => {
  console.log(req.body.competenceid, req.body.id, req.body.name);
  const course = new Course({
    competenceid: req.body.competenceid,
    courseid: req.body.id,
    coursename: req.body.name

  });
  console.log(course);

  course
    .save()
    .then(result => {
      res.status(201).json({
        message: "Course created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Invalid Here!" + err
      });
    });

});

//View all records
router.get("/view", (req, res, next) => {a

  var compid= req.query.compid; 
  //console.log(req.query);
  var courseQuery;
  courseQuery = Course.find({"competenceid":compid});


  let fetchedCourses;

  courseQuery
    .then(documents => {
        fetchedCourses = documents;
      return Course.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Courses fetched successfully!",
        courses: fetchedCourses
        
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching courses failed!" + error
      });
    });
});

//Get Max record Id
router.get("/getMaxid", (req, res, next) => {
 
  var maxIdquery;
  maxIdquery = Course.aggregate([{ $group: {_id: null, maxId: { $max: "$courseid" } } }]);

  maxIdquery.then(document => {
    if (document) {
      console.log(document);
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: "Max id not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Max id failed!" + error
      });
    });
  //console.log(maxId);
});


module.exports = router;