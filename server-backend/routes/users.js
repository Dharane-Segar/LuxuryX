const express = require("express");
const router = new express.Router();
let User = require("../models/User");


//fetch all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

//search function
router.get("/search/:key", async (req, res) => {
  let result = await User.find({
    $or: [
      {
        email: { $regex: req.params.key },
      },
      {
        fname: { $regex: req.params.key },
      },
      {
        address: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
});


module.exports = router;
