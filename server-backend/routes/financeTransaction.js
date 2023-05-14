const router = require("express").Router();
const transactionSchema = require("../models/financeTransaction");
const incomeSchema = require("../models/income");
const expenseSchema = require("../models/expense");
const budgetSchema = require("../models/budget");

//Read Transactions----------------------------------------------

router.get("/readfinanceT", async (req, res) => {
  try {
    const data = await transactionSchema.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

//Delete Transactions----------------------------------------------------------------------------

router.delete("/deleteT/:id", async (req, res) => {
  const id = req.params.id;

  await transactionSchema.findByIdAndRemove(id).exec();
  res.send("deleted");
});

//Update Transactions----------------------------------------------------------------------------

router.route("/updateT/:id").put(async (req, res) => {
  const id = req.params.id;

  const {
    newtypeshow,
    newcategoryshow,
    newamountshow,
    newremarkshow,
    newdateshow,
    newnameshow,
  } = req.body;

  const updateTransaction = {
    type: newtypeshow,
    category: newcategoryshow,
    amount: newamountshow,
    remark: newremarkshow,
    date: newdateshow,
    name: newnameshow,
  };

  try {
    const update = await transactionSchema
      .findByIdAndUpdate({ _id: id }, updateTransaction)
      .exec();
    if (!update) {
      res.status(404).send("Transaction not found");
      return;
    }
    res.send("Transaction updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

//Find Transaction By ID----------------------------------------------------------------------------

router.get("/readTByID/:id", async (req, res) => {
  fetchid = req.params.id;

  try {
    var data = await transactionSchema.find({ _id: fetchid });
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

//Add Transaction ----------------------------------------------------------------------------

router.route("/insertT").post((req, res) => {
  const { name, type, category, amount, remark, date, did } = req.body;

  var trans = new transactionSchema({
    name,
    type,
    category,
    amount,
    remark,
    date,
    did,
  });

  trans
    .save()
    .then(() => {
      res.json("Supplier Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Find Duplicate Transaction ----------------------------------------------------------------------------

router.get("/readDuplicate/:did", async (req, res) => {
  fetchid = req.params.did;
  try {
    var data = await transactionSchema.find({ did: fetchid });
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

//Search Transaction ----------------------------------------------------------------------------

router.get("/search/:key", async (req, res) => {
  let result = await transactionSchema.find({
    $or: [
      {
        type: { $regex: req.params.key },
      },
      {
        name: { $regex: req.params.key },
      },
      {
        date: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
});

//Insert Income ----------------------------------------------------------------------------

router.post("/insertIncome", async (req, res) => {
  const { amountI, dateI,didI } = req.body;

  var income = new incomeSchema({ amount:amountI, date:dateI,did:didI });

  try {
    await income.save();
  } catch (err) {
    console.log(err);
  }
});

//Read Income----------------------------------------------

router.get("/readIncome", async (req, res) => {
  try {
    const data = await incomeSchema.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});


//Insert Expense ----------------------------------------------------------------------------

router.post("/insertExpense", async (req, res) => {
  const { amountE, dateE, didE } = req.body;

  var expense = new expenseSchema({ amount:amountE, date:dateE ,did:didE});

  try {
    await expense.save();
  } catch (err) {
    console.log(err);
  }
});

//Read Expense----------------------------------------------

router.get("/readExpense", async (req, res) => {
  try {
    const data = await expenseSchema.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});



//Find Duplicate Income ----------------------------------------------------------------------------

router.get("/readDuplicateIncome/:did", async (req, res) => {
  fetchid = req.params.did;
  try {
    var data = await incomeSchema.find({ did: fetchid });
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});


//Find Duplicate Expense ----------------------------------------------------------------------------

router.get("/readDuplicateExpense/:did", async (req, res) => {
  fetchid = req.params.did;
  try {
    var data = await expenseSchema.find({ did: fetchid });
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});




//Read Type ----------------------------------------------------------------------------

router.get("/readType/:type", async (req, res) => {
   
  fetchtype=req.params.type;
  
  try {
      var data = await transactionSchema.find({type:fetchtype});
      res.send(data);
    } catch (error) {
      console.error(error);
    }
 
})



//Read Budget ----------------------------------------------------------------------------

router.get("/readBudget", async (req, res) => {
  try {
    const data = await budgetSchema.find().sort({_id: -1}).limit(1);
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

//Add Budget ----------------------------------------------------------------------------

router.post("/insertBudget", async (req, res) => {
  
  const { budget, dateBudget } = req.body;

  const Bdata = new budgetSchema({ budget: budget,date:dateBudget });

  try {
    await Bdata.save();
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
