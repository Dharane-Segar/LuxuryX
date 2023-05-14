const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryDriverSchema = new Schema({
    did:{
        type:String,
        required: true,
        
    },
    fullname:{
        type:String,
        required: true,
        
    },
    email:{
        type:String,
        required: true,
        unique:true,
        
    },
    password:{
        type:String,
        required: true,
        
    },
    address:{
        type:String,
        required: true,
        
    },
    phone:{
        type:String,
        required: true,
        
    },
    
    dob:{
        type:Date,
        required: true,
        
    },
    licenseno:{
        type:String,
        required:true,
        unique:true,

    },
    vehicleno:{
        type:String,
        required:true,
        unique:true,

    },
    nic:{
        type:String,
        required:true,
        unique:true,

    },
    basicsalary:{
        type:Number,
        required: true,
    },
    image:{
        type:String,
        
    }
   

})

const DeliveryDriver = mongoose.model("DeliveryDriver",DeliveryDriverSchema);
//Employee- Table name
// but it will employees in the database

module.exports = DeliveryDriver;