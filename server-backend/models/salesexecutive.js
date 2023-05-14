const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesExecutiveSchema = new Schema({
    sid:{
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
    qualification:{
        type:String,
        required: true,
        
    },

    basicsalary:{
        type:Number,
        required: true,
    },
    
    gender:{
        type:String,
        required: true,
        
    },
    image:{
        type:String,
        
    }

})

const SalesExecutive = mongoose.model("SalesExecutive",SalesExecutiveSchema);
//Employee- Table name
// but it will employees in the database

module.exports = SalesExecutive;