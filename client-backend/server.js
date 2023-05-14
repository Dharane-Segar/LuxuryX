const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || "8071";
mongoose.set("strictQuery", true);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/uploads", express.static("uploads"));
const URL = process.env.MONGODB_URL;

/*mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopologyL:true,
    useFindAndModify:false
});*/

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Mongodb Connection Success!");
});

const userRouter = require("./routes/users.js");
app.use("/user", userRouter);

const productRoute = require("./routes/product");
app.use("/product", productRoute);

const orderRoute = require("./routes/customerOrders");
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log("Server is up and running on port no " + PORT);
});
