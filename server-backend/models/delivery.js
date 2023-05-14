const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({

    did:{
        type:String,
        required: true,
    },
    deliveryid:{
        type:String,
        required: true,
        unique:true,
        
    },
    orderid:{
        type:String,
        required: true,
        unique:true,
        
    },
    trackingid:{
        type:String,
        required: true,
        unique:true,
        
    },

    deliveryaddress:{
        type:String,
        required: true,
        
        
    },
    deliveryfee:{
        type:String,
        required: true,
        
        
    },
    status:{
        type:String,
        required: true,
        
        
    },
   

})

const Delivery = mongoose.model("Delivery",DeliverySchema);


module.exports = Delivery;