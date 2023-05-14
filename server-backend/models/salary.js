const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySchema = new Schema(
    {
        Id:{
            type:Number
        },
        type:{
            type:String
        },
        eid:{
            type:String
        },
        basicsalary:{
            type : Number
        },
        othrs:{
            type : Number
        },
        otrate:{
            type : Number
        },
        paydate:{
            type : String
            
        },
        netsalary:{
            type : Number
        }
    }
)

const Salary = mongoose.model("Salary",SalarySchema);
//Employee- Table name
// but it will employees in the database

module.exports = Salary;