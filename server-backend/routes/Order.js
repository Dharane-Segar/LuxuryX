const router = require("express").Router();
let Order = require("../models/Order");

router.route("/addorder").post((req, res) => {

    const OrderNo = req.body.OrderNo;
    const ProductName = req.body.ProductName;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Price = Number(req.body.Price);
    const Status = req.body.Status;


    const newOrder = new Order({
        OrderNo,
        ProductName,
        Address,
        Email,
        Price,
        Status
    })

    newOrder.save().then(() => {

        res.json("Order Added")
    }).catch((err) => {
        console.log(err);
    })
})

//Display Orders
router.route("/order").get((req,res) => {
    Order.find().then((order) => {
        
        res.json(order)

    }).catch((err) => {
        console.log(err)
    })
})

//Update Order
router.route("/updateorder/:id").put(async(req,res) => {

    let orderId = req.params.id;

    const {OrderNo, ProductName, Address,Email,Price,Status} = req.body;

        const updateorder = {
            OrderNo,
            ProductName,
            Address,
            Email,
            Price,
            Status
        }

        const update = await Order.findByIdAndUpdate(orderId,updateorder);

        res.status(200).send({status : "Order updated", order : update})

})

router.route("/deleteorder/:id").delete(async(req,res) => {

    let orderId = req.params.id;

    await Order.findByIdAndDelete(orderId).then(() => {
        
        res.status(200).send({status : "Order deleted"});

    }).catch((err) =>{

        console.log(err.message);

        res.status(500).send({status : "Error with delete Order", error : err.message});
    })
    
})





//UPDATING THE STATUS OF A SPECIFIC ORDER.

router.route("/updateOrder/:id").put(async(req,res) => {

    let orderId = req.params.id;

    const Status = req.body.Quantity;

        const updateNewStatus = {
            Status
        }

        const update = await Order.findByIdAndUpdate(orderId,updateNewStatus);

        res.status(200).send({status : " Status updated"})
    })

    //get one user
router.route("/getorder/:id").get(async (req, res) => {
    let orderId = req.params.id;

    const order = await Order.findById(orderId).then((orders) => {
        res.status(200).send({ status: "Order fetched", orders })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with geting order", error: err.message })
    })
})

router.get("/search/:key", async (req, res) => {
    let result = await Order.find({
      $or: [
        {
          OrderNo: { $regex: req.params.key },
        },
        {
          ProductName: { $regex: req.params.key },
        },
        
      ],
    });
    res.send(result);
  });
    

module.exports = router;