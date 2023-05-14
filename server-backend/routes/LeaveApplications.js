const router = require("express").Router();
const LeaveApplication = require("../models/leaveapplication"); //import leave application model
const Counter = require("../models/counter"); //import sales counter model
const SE = require("../models/salesexecutive"); //import sales executive model
const DD = require("../models/deliverydriver"); //import delivery driver model



//CREATE - Create leaveapplication of delivery driver

router.route("/addladd").post((req, res) => {
  // get the body of the request and store the values in variables
  const eid = req.body.eid;
  const fullname = req.body.fullname;
  const title = req.body.title;
  const days = Number(req.body.days);
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const reason = req.body.reason;
  const status = "Pending";
  DD.findOne({ did: `${eid}` }, function (err, doc) {//check if the eid exists in the delivery driver table
    if (err) {
      console.error(err);
    } else {
      const hasMatch = Boolean(doc); // convert to boolean value
      console.log(hasMatch); // will log 'true' if a matching document was found, otherwise 'false'
      if (hasMatch == true) {//if eid exists
        Counter.findOneAndUpdate(//autoincrement field
          { id: "autoval" },
          { $inc: { seq: 1 } },
          { new: true },
          (err, cd) => {
            console.log("Counter value", cd);
            let seqId;
            if (cd == null) {
              const newval = new Counter({ id: "autoval", seq: 1 });
              newval.save();
              seqId = 1;
            } else {
              seqId = cd.seq;
            }
            const Id = seqId;//set the autoincremented value as Id

            const newLeave = new LeaveApplication({//creating object from leaveapplication model and assigning it to a const variable
              Id,
              eid,
              fullname,
              title,
              days,
              startdate,
              enddate,
              reason,
              status,
            });

            newLeave.save().then(() => {//save the newly created object in the database using save function
                res.json("Success");//send response
              })
              .catch((err) => {
                //if unsuccess
                res.json("Failed");//catches error and send tthe error as a json object to the frontend
                console.log(err);
              });
          }
        );
      } else {//if eid doesn't exixts
        res.json("No id");//send response
      }
    }
  });
});



//CREATE - Create leaveapplication of sales executive

router.route("/addlase").post((req, res) => {
  // get the body of the request and store the values in variables
  const eid = req.body.eid;
  const fullname = req.body.fullname;
  const title = req.body.title;
  const days = Number(req.body.days);
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const reason = req.body.reason;
  const status = "Pending";
  SE.findOne({ sid: `${eid}` }, function (err, doc) {//check if the sid exists in the delivery driver table
    if (err) {
      console.error(err);
    } else {
      const hasMatch = Boolean(doc); // convert to boolean value
      console.log(hasMatch); // will log 'true' if a matching document was found, otherwise 'false'
      if (hasMatch == true) {//if eid exists
        Counter.findOneAndUpdate(//autoincrement field
          { id: "autoval" },
          { $inc: { seq: 1 } },
          { new: true },
          (err, cd) => {
            console.log("Counter value", cd);
            let seqId;
            if (cd == null) {
              const newval = new Counter({ id: "autoval", seq: 1 });
              newval.save();
              seqId = 1;
            } else {
              seqId = cd.seq;
            }
            const Id = seqId;//set the autoincremented value as Id

            const newLeave = new LeaveApplication({//creating object from leaveapplication model and assigning it to a const variable
              Id,
              eid,
              fullname,
              title,
              days,
              startdate,
              enddate,
              reason,
              status,
            });

            newLeave.save().then(() => {//save the newly created object in the database using save function
                res.json("Success");//send response
              })
              .catch((err) => {
                res.json("Failed");//send response
                console.log(err);
              });
          }
        );
      } else {//if eid doesn't exixts
        res.json("No id");//send response
      }
    }
  });
});



//READ function - fetch data of all leaves

router.route("/getleaves").get((req, res) => {
    //get is used to retrieve data from database
  LeaveApplication.find()
    .then((leaves) => {
        //find() method is used to fetch details of all leaves from the db
      res.json(leaves);//if success, then a response is sent to front end(response is all leaves)
    })
    .catch((err) => {//if unsuccess
        res.status(422).json(error);//send error
      console.log(err);//display error
    });
});



//DELETE function

router.route("/deletela/:id").delete(async (req, res) => {
  let Id = req.params.id;//get the id from the request(parameter)
  await LeaveApplication.findByIdAndDelete(Id)//delete the leaveapplicationwith whose id = Id
    .then(() => {
      res.status(200).json("success");//send success message to the frontend
    })
    .catch((err) => {
      res.status(500).json("error");//send error message to the frontend
    });
});



//Function to get the the leave application details by their id

router.route("/getId/:id").get(async (req, res) => {
  let id = req.params.id;//get the id from the request(parameter)

  await LeaveApplication.findOne({ Id: `${id}` })//compare the Id with the got id and return the details
    .then((la) => {
      res.status(200).send({ status: "Details fetched", la });//send response as a json object and a status
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({ status: "Error with fetching details", error: err.message });//send error message
    });
});



//UPDATE function

router.route("/update/:id").put(async (req, res) => {
    let Id = req.params.id;//get the id from the request(parameter)

    // get the body of the request and store the values in variables
    const { status } = req.body;

    //This variable is the object to update. This object will be passed to the record of the variable "Id" and the respective id is updated with these values in the object.

    const updateStatus = {//fetch the retrieved info to a variable
      status,
    };

    await LeaveApplication.findByIdAndUpdate(Id, updateStatus);// update the details with the update variable where id = "Id"

    res.status(200).send("Done");//send status
  })
  .patch((err) => {
    console.log(err);
    res.status(500).json("Failed");//send status
  });


  
  //Function to get the the leave application details by  eid

router.route("/getEid/:id").get((req, res) => {
  let id = req.params.id;//get the id from the request(parameter)

  LeaveApplication.find({ eid: `${id}` })//compare the eid with the got id and return the details
    .then((e) => {
      res.json(e);//send response
    })
    .catch((err) => {
      console.log(err);//display error
    });
});

module.exports = router;
