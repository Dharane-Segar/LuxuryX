const mongoose=require("mongoose");

const budgetSchema= new mongoose.Schema({
    budget:{
        type:Number,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
  
});


const budget=mongoose.model("budget",budgetSchema);
module.exports=budget;