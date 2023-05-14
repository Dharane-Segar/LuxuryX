const mongoose=require("mongoose");

const incomeSchema= new mongoose.Schema({
   
    
    amount:{
        type:Number,
        require:true,
    },

    date:{
        type:String,
        require:true,
    },
    
    did:{
        type:String,
        require:true,
    },
  
});


const income=mongoose.model("income",incomeSchema);
module.exports=income;