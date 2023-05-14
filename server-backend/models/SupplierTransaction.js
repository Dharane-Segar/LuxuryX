const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const supplierTransactionSchema = new Schema({

    InvoiceNo : {
        type : String,
        required : true
    },
    SuppliedDate:{
        type : String,
        required: true
    },
    Supplier:{
        type : String,
        required: true
    },
    ProductName:{
        type : String,
        required: true
    },
    
    Quantity:{
        type : Number,
        required: true
    },
    Amount:{
        type: Number,
        required: true,
    }


})

const SupplierTransaction = mongoose.model("SupplierTransaction",supplierTransactionSchema);

module.exports = SupplierTransaction;