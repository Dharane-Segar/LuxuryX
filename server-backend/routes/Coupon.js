const router = require("express").Router();
let coupon = require("../models/Coupon");

router.route("/addcoupon").post((req, res) => {

    const code = req.body.code;
    const expiryDate = req.body.expiryDate;
    const usageLimit = req.body.usageLimit;
    const usedCount = req.body.usedCount;
    const discountPercentage = Number(req.body.discountPercentage);
    const product = req.body.product;


    const newCoupon = new coupon({
        code,
        expiryDate,
        usageLimit,
        usedCount,
        discountPercentage,
        product
    })

    newCoupon.save().then(() => {

        res.json("Coupon details added!")
    }).catch((err) => {
        console.log(err);
    })
})

//Display Coupon Details
router.route("/coupon").get((req, res) => {
    coupon.find().then((coupons) => {

        res.json(coupons)

    }).catch((err) => {
        console.log(err)
    })
})

//Update Details
router.route("/updatecoupon/:id").put(async (req, res) => {

    let couponId = req.params.id;

    const { code, expiryDate, usageLimit, usedCount, discountPercentage, product } = req.body;

    const updateCoupon = {
        code,
        expiryDate,
        usageLimit,
        usedCount,
        discountPercentage,
        product
    }

    const update = await coupon.findByIdAndUpdate(couponId, updateCoupon);

    res.status(200).send({ status: "Data is updated", coupon: update })

})

router.route("/deletecoupon/:id").delete(async (req, res) => {

    let couponId = req.params.id;

    await coupon.findByIdAndDelete(couponId).then(() => {

        res.status(200).send({ status: "Delete details" });

    }).catch((err) => {

        console.log(err.message);

        res.status(500).send({ status: "Error with deleting data", error: err.message });
    })

})

//get details of single transaction by invoice no
router.route("/getcoupon/:code").get((req, res) => {
    let codeS = req.params.code;

    coupon.find({ "code": codeS })
        .then((Coupon) => {
            res.status(200).send({ status: "Coupon fetched", Coupon })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Coupon", error: err.message });
        })
})

router.get("/search/:key", async (req, res) => {
    let result = await coupon.find({
        $or: [
            {
                code: { $regex: req.params.key },
            },
            {
                product: { $regex: req.params.key },
            },
            {
                usedCount: { $regex: req.params.key },
            },
        ],
    });
    res.send(result);
});




module.exports = router;