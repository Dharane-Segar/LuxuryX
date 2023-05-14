const router = require("express").Router();
const Admin = require("../models/admin");

router.post("/addad", async (req, res) => {
  // console.log(req.body);;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const preuser = await Admin.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(200).json("Taken");
    } else {
      const newAdmin = new Admin({
        fullname,
        email,
        password,
      });

      await newAdmin.save();
      res.status(201).json(newAdmin);
      console.log("Added");
      console.log(newAdmin);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
