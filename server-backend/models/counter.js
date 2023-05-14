const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    id:{
        type:String
    },
    seq:{
    type:Number
}
})
const Counter = mongoose.model("Counter",counterSchema);
//Employee- Table name
// but it will employees in the database

module.exports = Counter;