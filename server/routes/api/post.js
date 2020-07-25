const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

//Validation
const validatePostInput = require("../../validation/post");

//Formatting keyword
const format = (value) => {
  return value.toLowerCase();
};

//get array of post
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((post) => res.json(post))
    .catch((err) => res.status(404));
});

//get array of post by keyword
router.get("/:keyword", (req, res) => {
  Post.find({ keyword: { $regex: ".*" + req.params.keyword + ".*" } })
    .then((post) => res.json(post))
    .catch((err) => res.status(404));
});

//Post request
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    keyword: format(req.body.keyword),
    text: req.body.text,
    name: req.body.name,
    user: req.user.id,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  newPost.save().then((post) => res.json(post));
});

//like a post route
// router.post('/like/:id',passport.authenticate('jwt',{session:false}),
// (req,res)=>{
//   Profile
// })

module.exports = router;
