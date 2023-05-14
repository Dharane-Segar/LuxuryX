const express = require("express");
const router = new express.Router();
let User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireSignIn = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");
//user register
router.post("/register", async (req, res) => {
  const { fname, email, password, address, contact } = req.body;

  if (!fname || !email || !password || !address || !contact) {
    res.status(422).json({ error: "fill the all details" });
  }

  try {
    const preuser = await User.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This user already exist" });
    } else {
      const finaluser = new User({
        fname,
        email,
        password,
        address,
        contact,
      });

      const storedata = await finaluser.save();
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log("Cannot register the user" + error.message);
    res.status(422).send(error);
  }
});
//login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.fname,
        email: user.email,
        address: user.address,
        contact: user.contact,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
});
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
//test protected routes
router.get("/test", requireSignIn, async (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//user update
router.put("/update-user", requireSignIn, async (req, res) => {
  const { email, password, name, address, contact } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    user.fname = req.body.name || user.fname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.address = req.body.address || user.address;
    user.contact = req.body.contact || user.contact;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      updatedUser,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
//user delete by id
router.route("/delete/:id").delete(requireSignIn, async (req, res) => {
  let userId = req.params.id;

  await User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: error.message });
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

router.route("/sendotp").post(async (req, res) => {
  console.log(req.body);
  const _otp = Math.floor(100000 + Math.random() * 900000);
  console.log(_otp);
  let user = await User.findOne({ email: req.body.email });
  // send to user mail
  if (!user) {
    res.send({ code: 500, message: "user not found" });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "itpmetrogroup2@gmail.com",
      pass: "hfyfimbbvdzdypfh",
    },
  });

  const mag = "This is your otp number " + _otp;

  let info = await transporter.sendMail({
    from: "itpmetrogroup2@gmail.com",
    to: req.body.email, // list of receivers
    subject: "OTP", // Subject line
    html: mag,
  });
  if (info.messageId) {
    console.log(info, 84);
    User.updateOne({ email: req.body.email }, { otp: _otp })
      .then((result) => {
        res.send({ code: 200, message: "otp send" });
      })
      .catch((err) => {
        res.send({ code: 500, message: "Server err" });
      });
  } else {
    res.send({ code: 500, message: "Server err" });
  }
});

router.post("/submitotp", async (req, res) => {
  try {
    const { otp, password } = req.body;
    //check
    const user = await User.findOne({ otp });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashPassword = async (password) => {
      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      } catch (error) {
        console.log(error);
      }
    };
    const hashed = await hashPassword(password);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});

module.exports = router;
