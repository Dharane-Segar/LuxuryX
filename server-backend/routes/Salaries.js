const router = require("express").Router();
const nodemailer = require("nodemailer");
const Salary = require("../models/salary");//import salary model
const SE = require("../models/salesexecutive");//import sales executive model
const DD = require("../models/deliverydriver");//import delivery model
const C = require("../models/c");//import leave c model



//CREATE - Create salary

router.post("/addsal", async (req, res) => {
  // get the body of the request and store the values in variables
  const type = req.body.type;
  const eid = req.body.eid;
  const basicsalary = Number(req.body.basicsalary);
  const othrs = Number(req.body.othrs);
  const otrate = Number(req.body.otrate);
  var paydate = req.body.paydate;
  const netsalary = Number(req.body.netsalary);
  const email = req.body.email;
  const msg = "Your salary Rs." + netsalary + " has been credited";//message that to be sent in the email

  if (type == "Sales Executive") {
    SE.findOne({ sid: `${eid}` }, function (err, doc) {//check if the eid exists in the sales executive table
      if (err) {
        console.error(err);
      } else {
        const hasMatch = Boolean(doc);// convert to boolean value
        if (hasMatch == true) {//if eid exists
          C.findOneAndUpdate(//autoincrement field
            { id: "autoval" },
            { $inc: { seq: 1 } },
            { new: true },
            (err, cd) => {
              let seqId;
              if (cd == null) {
                const newval = new C({ id: "autoval", seq: 1 });
                newval.save();
                seqId = 1;
              } else {
                seqId = cd.seq;
              }

              const Id = seqId;//set the autoincremented value as Id

              const newSalary = new Salary({//creating object from salary model and assigning it to a const variable
                Id,
                type,
                eid,
                basicsalary,
                othrs,
                otrate,
                paydate,
                netsalary,
              });

              newSalary.save().then(() => {//save the newly created object in the database using save function
                  res.json("Success");//send response
                })
                .catch((err) => {
                  res.json("Failed");//catches error and send tthe error as a json object to the frontend
                  console.log(err);
                });
            }
          );
//#8f00ff
          try {
            //send email
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "itpmetrogroup2@gmail.com",
                pass: "hfyfimbbvdzdypfh",
              },
            });

            const mailOptions = {
              from: "itpmetrogroup2@gmail.com",
              to: email,
              subject: "Salary Transaction",
              html: msg,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Error" + error);
              } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({ status: 201, info });
              }
            });
          } catch (error) {
            console.log("Error" + error);
            res.status(401).json({ status: 401, error });
          }
        } else {//if eid doesn't exixts
          res.json("No id");//send response
        }
      }
    });
  } else if (type == "Delivery Driver") {
    DD.findOne({ did: `${eid}` }, function (err, doc) {//check if the eid exists in the delivery driver table
      if (err) {
        console.error(err);
      } else {
        const hasMatch = Boolean(doc);// convert to boolean value
        if (hasMatch == true) {//if eid exists
          C.findOneAndUpdate(//autoincrement field
            { id: "autoval" },
            { $inc: { seq: 1 } },
            { new: true },
            (err, cd) => {
              let seqId;
              if (cd == null) {
                const newval = new C({ id: "autoval", seq: 1 });
                newval.save();
                seqId = 1;
              } else {
                seqId = cd.seq;
              }
              const Id = seqId;//set the autoincremented value as Id

              const newSalary = new Salary({//creating object from salary model and assigning it to a const variable
                Id,
                type,
                eid,
                basicsalary,
                othrs,
                otrate,
                paydate,
                netsalary,
              });

              newSalary.save().then(() => {//save the newly created object in the database using save function
                  res.json("Success");//send response
                })
                .catch((err) => {
                    //if unsuccess
                  res.json("Failed");//catches error and send tthe error as a json object to the frontend
                  console.log(err);
                });
            }
          );
          try {

            //send email
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "itpmetrogroup2@gmail.com",
                pass: "hfyfimbbvdzdypfh",
              },
            });

            const mailOptions = {
              from: "itpmetrogroup2@gmail.com",
              to: email,
              subject: "Salary Transaction",
              html: msg,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Error" + error);
              } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({ status: 201, info });
              }
            });
          } catch (error) {
            console.log("Error" + error);
            res.status(401).json({ status: 401, error });
          }
        } else {//if eid doesn't exixts
          res.json("No id");//send response
        }
      }
    });
  }
});

//READ function - fetch data of all salary transactions

router.route("/getsalary").get((req, res) => {
  Salary.find().then((salary) => {
    //find() method is used to fetch details of all salary transactions from the db
      res.json(salary);//if success, then a response is sent to front end(response is all salaries)
    })
    .catch((err) => {//if unsuccess
      console.log(err);//display error
    });
});

//DELETE function

router.route("/deletet/:id").delete(async (req, res) => {
  let Id = req.params.id;//get the id from the request(parameter)
  await Salary.findByIdAndDelete(Id)
    .then(() => {
      res.status(200).json("success");//send success message to the frontend
    })
    .catch((err) => {
      res.status(500).json("error");//send error message to the frontend
    });
});


//UPDATE function

router.route("/update/:id").put(async (req, res) => {
    let Id = req.params.id;//get the id from the request(parameter)

    // get the body of the request and store the values in variables
    const { othrs, otrate, paydate, netsalary, email } = req.body;

    var difference = req.body.difference;
    var msg;

    //set message according the value of difference

    if (difference < 0) {
      difference = difference * -1;
      msg = "Your salary has decreased by Rs." + difference;
    } else {
      msg = "Your salary has increased by Rs." + difference;
    }
    
    //This variable is the object to update. This object will be passed to the record of the variable "Id" and the respective id is updated with these values in the object.

    const updateTransaction = {
      othrs,
      otrate,
      paydate,
      netsalary,
    };

    await Salary.findByIdAndUpdate(Id, updateTransaction);// update the details with the update variable where id = "Id"

    res.status(200).send("Done");//send status
    try {
      //send email when an update is done to the salary

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "itpmetrogroup2@gmail.com",
          pass: "hfyfimbbvdzdypfh",
        },
      });

      const mailOptions = {
        from: "itpmetrogroup2@gmail.com",
        to: email,
        subject: "Change in salary",
        html: msg,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error" + error);
        } else {
          console.log("Email sent:" + info.response);
          res.status(201).json({ status: 201, info });
        }
      });
    } catch (error) {
      console.log("Error" + error);
      res.status(401).json({ status: 401, error });
    }
  })
  .patch((err) => {
    console.log(err);
    res.status(500).json("Failed");//send status
  });

  //Function to get the the salary details by their id

router.route("/getId/:id").get(async (req, res) => {
  let id = req.params.id;//get the id from the request(parameter)

  await Salary.findOne({ Id: `${id}` })//compare the Id with the got id and return the details
    .then((t) => {
      res.status(200).send({ status: "Details fetched", t });//send response as a json object and a status
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({ status: "Error with fetching details", error: err.message });//send error message
    });
});

  //Function to get the the salary details by their eid

router.route("/getEid/:id").get((req, res) => {
  let id = req.params.id;//get the id from the request(parameter)

  Salary.find({ eid: `${id}` })//compare the eid with the got id and return the details
    .then((e) => {
      res.json(e);//send response
    })
    .catch((err) => {
      console.log(err);//display error
    });
});

router.route("/getTid/:id").get(async (req, res) => {
  let id = req.params.id;//get the id from the request(parameter)

  await Salary.findOne({ Id: `${id}` })//compare the sid with the got id and return the details
    .then((s) => {
      res.status(200).send({ status: "SE Details fetched", s });//send response as a json object and a status
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({ status: "Error with fetching SE details", error: err.message }); //send error message
    });
});

module.exports = router;
