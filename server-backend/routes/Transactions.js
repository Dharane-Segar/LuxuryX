const router = require("express").Router();
const Transaction = require("../models/transaction");


router.post("/det",async(req,res)=>{

    const eid = req.body.eid;
    const email = req.body.email;
    const basicsalary = Number(req.body.basicsalary);

    const newTransaction  =new Transaction({
        eid,email,basicsalary

    });

    await newTransaction.save();
    res.status(201);
    console.log("Added");
            
})

router.route("/get/:id").get(async(req,res) => {
    let id = req.params.id;

    await Transaction.findOne({"eid" : `${id}`}).then((t) => {
        res.status(200).send({status : "Details fetched", t})
    }).catch((err) => {
        console.log(err.message);

        res.status(500).send({status : "Error with fetching details",error : err.message});
    })
})

router.route("/delete/:id").delete(async(req,res) => {
    let Id = req.params.id;
    await Transaction.findOneAndDelete(Id).then(()=>{
        res.status(200).json("success");
    }).catch((err) => {
        res.status(500).json("error");

    })
})

module.exports = router;