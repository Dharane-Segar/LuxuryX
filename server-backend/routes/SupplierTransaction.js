const router = require("express").Router();
let SupplierTransaction = require("../models/SupplierTransaction");

router.route("/addsupplierTransaction").post((req, res) => {

    const InvoiceNo = req.body.InvoiceNo;
    const SuppliedDate = req.body.SuppliedDate;
    const Supplier = req.body.Supplier;
    const ProductName = req.body.ProductName;
    const Quantity = Number(req.body.Quantity);
    const Amount = Number(req.body.Amount);


    const newSupplierTransaction = new SupplierTransaction({
        InvoiceNo,
        SuppliedDate,
        Supplier,
        ProductName,
        Quantity,
        Amount
    })

    newSupplierTransaction.save().then(() => {

        res.json("Supplier Transaction Added")
    }).catch((err) => {
        console.log(err);
    })
})

//Display Supplier Transaction
router.route("/supplierTransaction").get((req,res) => {
    SupplierTransaction.find().then((supplierTransactions) => {
        
        res.json(supplierTransactions)

    }).catch((err) => {
        console.log(err)
    })
})

//Update Supplier Transactions
router.route("/updatesupplierTransaction/:id").put(async(req,res) => {

    let supplierTransactionId = req.params.id;

    const {InvoiceNo, SuppliedDate, Supplier,ProductName,Quantity,Amount} = req.body;

        const updatesupplierTransaction = {
            InvoiceNo,
            SuppliedDate,
            Supplier,
            ProductName,
            Quantity,
            Amount
        }

        const update = await SupplierTransaction.findByIdAndUpdate(supplierTransactionId,updatesupplierTransaction);

        res.status(200).send({status : "Supplier Transaction updated", supplierTransaction : update})

})

router.route("/deletesupplierTransaction/:id").delete(async(req,res) => {

    let supplierTransactionId = req.params.id;

    await SupplierTransaction.findByIdAndDelete(supplierTransactionId).then(() => {
        
        res.status(200).send({status : "supplier Transaction deleted"});

    }).catch((err) =>{

        console.log(err.message);

        res.status(500).send({status : "Error with delete supplier Transaction", error : err.message});
    })
    
})

//get details of single transaction by invoice no
router.route("/getsupplierTransaction/:InvoiceNo").get((req,res)=>{
    let InvoiceNoS = req.params.InvoiceNo;

    SupplierTransaction.find({"InvoiceNo" : InvoiceNoS})
    .then((SupplierTransaction)=>{
        res.status(200).send({status:"Supplier Transaction fetched",SupplierTransaction})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with Supplier", error : err.message});
    })
})


//Fetching inventory details based on the item code.
router.route("/getsupplierTransactionProductName/:productName").get(async(req,res) => {
    let productName = req.params.productName;

    await SupplierTransaction.findOne({"ProductName" : `${productName}`}).then((supplierTransaction) => {
        res.status(200).send({status : "Supplier Transaction Details fetched", supplierTransaction})
    }).catch((err) => {
        console.log(err.message);

        res.status(500).send({status : "Error with fetching supplier Transaction details",error : err.message});
    })
})

//UPDATING THE QUANTITY OF A SPECIFIC ITEM CODE.

router.route("/updateQuantitysupplierTransaction/:id").put(async(req,res) => {

    let supplierTransactionId = req.params.id;

    const Quantity = Number(req.body.Quantity);

        const updateNewQuantity = {
            Quantity
        }

        const update = await SupplierTransaction.findByIdAndUpdate(supplierTransactionId,updateNewQuantity);

        res.status(200).send({status : " new Quantity updated"})
    })


    router.get("/search/:key", async (req, res) => {
        let result = await SupplierTransaction.find({
          $or: [
            {
              InvoiceNo: { $regex: req.params.key },
            },
            {
              ProductName: { $regex: req.params.key },
            },
            {
              Supplier: { $regex: req.params.key },
            },
          ],
        });
        res.send(result);
      });

    router.get('/inventoryReport', async (req, res) => {
        try {
          const products = await SupplierTransaction.aggregate([
            { $group: { _id: '$ProductName', Quantity: { $sum: '$Quantity' } } },
            { $sort: { _id: 1 } },
          ]);
          res.json(products);
        } catch (err) {
          res.json({ message: err });
        }
      });

module.exports = router;