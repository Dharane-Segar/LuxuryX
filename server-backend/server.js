const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || "8070";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true
}))

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

/*mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopologyL:true,
    useFindAndModify:false
});*/

mongoose.connect(URL);

mongoose.set('strictQuery', true);

const connection = mongoose.connection;
connection.once("open", function () {
        console.log("Mongodb Connection Success!");
    })

app.listen(PORT, () => {
    console.log('Server is up and running on port no ' + PORT)
})

const salesexecutiveRouter = require("./routes/SalesExecutives.js");
app.use("/salesexecutive",salesexecutiveRouter);

const deliverydriverRouter = require ("./routes/DeliveryDrivers.js");
app.use("/deliverydriver",deliverydriverRouter);

const adminRouter = require ("./routes/Admins.js");
app.use("/admin",adminRouter);

const loginRouter = require("./routes/Logins.js");
app.use("/login",loginRouter);

const leaveRouter = require("./routes/LeaveApplications.js");
app.use("/leave",leaveRouter);

const salaryRouter = require("./routes/Salaries.js");
app.use("/salary",salaryRouter);

const transactionRouter = require("./routes/Transactions.js");
app.use("/t",transactionRouter);

const supplierRouter = require("./routes/Supplier.js");
app.use("/supplier", supplierRouter);

const supplierTransactionRouter = require("./routes/SupplierTransaction.js");
app.use("/supplierTransaction", supplierTransactionRouter);

const userRouter = require("./routes/users.js");
app.use("/user", userRouter);

const productRoute = require("./routes/product");
app.use("/product", productRoute);

const deliveryRouter = require("./routes/delivery.js");
app.use("/delivery",deliveryRouter);

const orderRouter = require("./routes/Order.js");
app.use("/order", orderRouter);

const couponRouter = require("./routes/Coupon.js");
app.use("/coupon", couponRouter);

const financeTransaction = require("./routes/financeTransaction.js");
app.use("/financeTransaction",financeTransaction);

const bills = require("./routes/bills.js");
app.use("/bills",bills);