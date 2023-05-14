const mongoose=require("mongoose");

const transactionSchema= new mongoose.Schema({
    type:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    amount:{
        type:Number,
        require:true,
    },
    remark:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    did:{
        type:String,
        
    },
});


const transaction=mongoose.model("transaction",transactionSchema);
module.exports=transaction;