const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
        
    }


})

const Admin = mongoose.model("Admin",AdminSchema);
//Employee- Table name
// but it will employees in the database

module.exports = Admin;