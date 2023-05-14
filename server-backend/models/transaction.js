const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TSchema = new Schema({
    eid:{
        type:String,
        required: true,
        
    },
    email:{
        type:String,
        required: true,
        
    },

    basicsalary:{
        type:Number,
        required: true,
        
    }


})

const Transaction = mongoose.model("Detail",TSchema);
//Employee- Table name
// but it will employees in the database

module.exports = Transaction;