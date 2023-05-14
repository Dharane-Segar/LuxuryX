const mongoose=require("mongoose");

const billsSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    
    amount:{
        type:Number,
        require:true,
    },

    status:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
  
});


const bills=mongoose.model("bills",billsSchema);
module.exports=bills;