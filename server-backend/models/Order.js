const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const orderSchema = new Schema({

    OrderNo : {
        type : String,
        required : true
    },
    ProductName:{
        type : String,
        required: true
    },
    Address:{
        type : String,
        required: true
    },
    Email:{
        type : String,
        required: true
    },
    
    Price:{
        type : Number,
        required: true
    },
    Status:{
        type: String,
        required: true,
    }


})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;