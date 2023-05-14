const router = require("express").Router();
const Admin = require('../models/admin');
const SE =  require('../models/salesexecutive');
const DD = require('../models/deliverydriver');
const bcrypt = require("bcrypt")

router.post("/log",async(req,res)=>{
    const{email,password} = req.body;

    try{
        const check1 = await Admin.findOne({email:email})
        const check2 = await SE.findOne({email:email})
        const check3 = await DD.findOne({email:email})
        const accType = req.body.accType;

        if((check1) && accType === "Admin"){
            const p1 = await Admin.findOne({password:password})
            if(p1){
                res.json({type:"admin",check1})
                
                
            }else{
                res.json("Invalid Password")
            }
                
        }else if((check2) && accType === "Sales Executive"){
            const p2 = await bcrypt.compare(password,check2.password)
            if(p2){
                res.json({type:"se",check2});
            }else{
                res.json("Invalid Password")
            }

                
        }else if((check3) && accType === "Delivery Driver"){
            const p3 = await bcrypt.compare(password,check3.password)
            if(p3){
                res.json({type:"dd",check3});
            }else{
                res.json("Invalid Password")
            }      
        }else{
            res.json("Not exist")
        }
    }catch(e){
        res.json("No")
    }
});


module.exports = router;