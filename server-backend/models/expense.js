const mongoose=require("mongoose");

const expenseSchema= new mongoose.Schema({
   
    
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


const expense=mongoose.model("expense",expenseSchema);
module.exports=expense;