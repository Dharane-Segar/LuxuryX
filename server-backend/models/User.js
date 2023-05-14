const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create user schema
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address: {
    type: {},
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const USER = mongoose.model("Customer", userSchema);
module.exports = USER;
