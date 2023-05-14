const router = require("express").Router();
let Delivery = require("../models/delivery");

//http://localhost:8070/delivery/add 

router.route("/add").post((req, res) => {

    const deliveryid =  (req.body.deliveryid);
    const orderid =  (req.body.orderid);
    const trackingid = (req.body.trackingid);
    const did = (req.body.did)
    const deliveryaddress = req.body.deliveryaddress;
    const deliveryfee =  (req.body.deliveryfee);

    const newDelivery = new Delivery({

        deliveryid,
        orderid,
        trackingid,
        did,
        deliveryaddress,
        deliveryfee,
        status: "Order Being Received",

    })
    newDelivery.save().then(() => {
        res.json("New Delivery Added")
    }).catch((err) => {
        console.log(err);
    })
})
http://localhost:8070/delivery

router.route("/get").get(async(req, res) => {
    
    Delivery.find().then((Delivery) =>{
        res.json(Delivery)
    }).catch((err) =>{
        console.log(err)
    })
})

http://localhost:8070/delivery/update/adfhkjasjdfhka

router.route("/update/:id").put(async (req, res) => {
   let userId = req.params.id; 
   const{deliveryid,orderid,trackingid,did,deliveryaddress,deliveryfee} = req.body;

   const updateDelivery = {
        
    deliveryid,
    orderid,
    trackingid,
    did,
    deliveryaddress,
    deliveryfee,

   }

   const update = await Delivery.findByIdAndUpdate(userId, updateDelivery)
   .then(() => {
   res.status(200).send({status: "Delivery updated"})
   }).catch(err => {
    console.log(err);
    res.status(500).send({status: "Error with Updating data", error: err.message});
    })
})

router.route("/updateDD/:id").put(async (req, res) => {
    let userId = req.params.id; 
    const{status} = req.body;
 
    const updateDelivery = {
         
        status
 
    }
 
    const update = await Delivery.findByIdAndUpdate(userId, updateDelivery)
    .then(() => {
    res.status(200).send({status: "Delivery driver updated"})
    }).catch(err => {
     console.log(err);
     res.status(500).send({status: "Error with Updating data", error: err.message});
     })
 })

http://localhost:8070/delivery/delete/adfhkjasjdfhka

router.route('/delete/:id').delete(async(req, res) => {
    let userId = req.params.id;

    await Delivery.findByIdAndDelete(userId)
        .then(() => {
        res.status(200).send({status:"Delivery deleted successfully"});
        }).catch(err => {
            console.log(err.message);
            res.status(500).send({status:"Error deleting delivery"});
        })
})

router.route("/get/:id").get(async (req, res) => {
    let objId = req.params.id;
    const delivery = await Delivery.findById(objId)
    .then((delivery) => {
        res.status(200).send({status:"Delivery Found", delivery})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Delivery Error", error: err.message});
    })

})

router.route("/getDeliDid/:id").get((req, res) => {
    let id = req.params.id;
  
    Delivery.find({ did: `${id}` })
      .then((e) => {
        res.json(e);//send response
      })
      .catch((err) => {
        console.log(err);//display error
      });
  });


module.exports = router;
