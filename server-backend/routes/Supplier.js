const router = require("express").Router();
const { response } = require("express");
let Supplier = require("../models/Supplier");



router.route("/addsupplier").post((req, res) => {
    const {name,address,contactNumber,email,productsSupplied} = req.body;

    const newSupplier = new Supplier({
        name,
        address,
        contactNumber,
        email,
        productsSupplied


    })

    newSupplier.save().then(() => {
        res.json("Supplier Added")
    }).catch((err) => {
        console.log(err);
    })
})
//read details
router.route("/supplier").get((req,res)=>{
    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })
})
//delete details
router.route("/deletesupplier/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Supplier.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Delete details"});
    }).catch((err)=>{
        res.status(500).send({status:"Error with deleting data"});
        console.log(500);
    })
})


router.route("/search/searchsupplier/:keyword").get(async (req, res) => {
    let keyword = req.params.keyword;
    await Employee.find({ "name": `${keyword}` }).then((suppliers) => {
        res.json(suppliers);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get the Supplier", error: err.message });
    })
})


// update supplier data
router.route("/updatesupplier/:id").put(async (req, res) => {
    let userId = req.params.id;


    const { name, address, contactNumber, email, productsSupplied } = req.body;

    const updateSupplier = {
        name, 
        address, 
        contactNumber, 
        email,
        productsSupplied
    }
    const update = await Supplier.findByIdAndUpdate(userId, updateSupplier).then(() => {
        res.status(200).send({ status: "Supplier updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", errror: err.message });
    });
})
//get one user
router.route("/getsupplier/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Supplier.findById(userId).then((suppliers) => {
        res.status(200).send({ status: "Supplier fetched", suppliers })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get Supplier", error: err.message })
    })
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





module.exports = router;


