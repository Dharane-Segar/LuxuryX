const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cSchema = new Schema({
    id:{
        type:String
    },
    seq:{
    type:Number
}
})
const C = mongoose.model("C",cSchema);
//Employee- Table name
// but it will employees in the database

module.exports = C;