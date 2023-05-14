const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    Id:{
        type:Number
    },
    eid:{
        type:String,
        required : true
    },
    fullname:{
        type:String,
        required : true
    },

    days:{
        type:Number,
        required : true
    },
    startdate:{
        type:Date,
        required : true
    },
    enddate:{
        type:Date,
        required : true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String
    }

})

    const Leave = mongoose.model("LeaveApplication",LeaveSchema);
//Employee- Table name
// but it will employees in the database

module.exports = Leave;



