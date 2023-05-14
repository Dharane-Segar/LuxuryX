const router = require("express").Router();
const billsSchema = require("../models/bills");


//REad Bills------------------------------------------------------------------

router.get("/readB", async (req, res) => {
    try {
        const data = await billsSchema.find({});
        res.send(data);
      } catch (error) {
        console.error(error);
      }
  })

//Delete Bills----------------------------------------------------------------------------

router.delete("/deleteBills/:id", async (req, res) => {
    const id = req.params.id;
  
    await billsSchema.findByIdAndRemove(id).exec();
    res.send("deleted");
  });
  
  //Update Bills----------------------------------------------------------------------------
  
  router.route("/updateBills/:id").put(async (req, res) => {
    const id = req.params.id;
  
    const {
      newName,
      newAmount,
      newStatus,
      newDate,
      
    } = req.body;
  
    const updateTransaction = {
      name: newName,
      amount: newAmount,
      status: newStatus,
      date: newDate,
     
    };
  
    try {
      const update = await billsSchema
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
  
  //Find Bills By ID----------------------------------------------------------------------------
  
  router.get("/readBillsByID/:id", async (req, res) => {
    fetchid = req.params.id;
  
    try {
      var data = await billsSchema.find({ _id: fetchid });
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  });
  
  //Add Bills ----------------------------------------------------------------------------
  
  router.route("/insertBills").post((req, res) => {
    const { name, amount, status, date} = req.body;
  
    var bills = new billsSchema({
      name,
      amount,
      status,
      date,
    });
  
    bills
      .save()
      .then(() => {
        res.json("Supplier Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  
  
  
  //find Duplicate Bills ----------------------------------------------------------------------------
  
  router.get("/readDuplicate/:did", async (req, res) => {
     
    fetchid=req.params.did;
    try {
        var data = await billsSchema.find({did:fetchid});
        res.send(data);
      } catch (error) {
        console.error(error);
      }
   
  });
  
  
  //Search Bills ----------------------------------------------------------------------------
  
  router.get("/search/:key", async (req, res) => {
    let result = await billsSchema.find({
      $or: [
        {
          name: { $regex: req.params.key },
        },
        {
          status: { $regex: req.params.key },
        },
       
        
      ],
    });
    res.send(result);
  });
  



  module.exports = router;