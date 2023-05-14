const router = require("express").Router();
const SalesExecutive = require("../models/salesexecutive"); //import sales executive model
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");

//CREATE function - create/adding a salesexecutive

router.post("/addse", async (req, res) => {
  // get the body of the request and store the values in variables
  const sid = req.body.sid;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const phone = Number(req.body.phone);
  const dob = req.body.dob;
  const qualification = req.body.qualification;
  const basicsalary = Number(req.body.basicsalary);
  const gender = req.body.gender;
  const image = req.body.image;
  var msg = "You are now an employee of LuxuryX. Your username is " + email + " and password is " + password
 

  try {
    const preuser = await SalesExecutive.findOne({ email: email }); //check whether the email address already exists
    const useId = await SalesExecutive.findOne({ sid: sid }); //check whether the sid already exists
    console.log(preuser);

    if (preuser) {
      res.status(200).json("Taken"); //response in json format is sent to the frontend if email is already taken
    } else if (useId) {
      res.status(200).json("Id"); //response in json format is sent to the frontend if sid is already taken
    } else {

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
          subject: "Congratulations!",
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
      bcrypt.hash(password,12).then(hashedpassword => {
        const newSalesExecutive = new SalesExecutive({
          //creating object from salesexecutive model and assigning it to a const variable
          sid,
          fullname,
          email,
          password:hashedpassword,
          address,
          phone,
          dob,
          qualification,
          basicsalary,
          gender,
          image,
        });
  
        newSalesExecutive.save(); //save the newly created object in the database using save function
        res.status(201).json(newSalesExecutive); //response in json format is sent if above condition true(if object is passed)

      })
      
  
    }
  } catch (error) {
    //if unsuccess
    res.status(422).json(error); //catches error and send tthe error as a json object to the frontend
  }
});

//READ function - fetch data of all salesexecutives

router.route("/getse").get((req, res) => {
  //get is used to retrieve data from database
  SalesExecutive.find()
    .then((salesexecutives) => {
      //find() method is used to fetch details of all deliverydrivers from the db
      res.json(salesexecutives);//if success, then a response is sent to front end(response is all sales executives)
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE function

router.route("/deletese/:id").delete(async (req, res) => {
  let Id = req.params.id;//get the id from the request(parameter)
  await SalesExecutive.findByIdAndDelete(Id)//delete the deliverydriver with whose id = Id
    .then(() => {
      res.status(200).json("success");//send success message to the frontend
    })
    .catch((err) => {
      res.status(500).json("error");//send error message to the frontend
    });
});

//Function to get the the salesexecutive details by their sid

router.route("/getSid/:id").get(async (req, res) => {
  let id = req.params.id;//get the id from the request(parameter)

  await SalesExecutive.findOne({ sid: `${id}` })//compare the sid with the got id and return the details
    .then((se) => {
      res.status(200).send({ status: "SE Details fetched", se });//send response as a json object and a status
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({ status: "Error with fetching SE details", error: err.message }); //send error message
    });
});

//UPDATE function

router.route("/update/:id").put(async (req, res) => {
    let Id = req.params.id;//get the id from the request(parameter)

    // get the body of the request and store the values in variables
    const {
      fullname,
      email,
      address,
      phone,
      dob,
      qualification,
      basicsalary,
      gender,
    } = req.body;

    //This variable is the object to update. This object will be passed to the record of the variable "Id" and the respective id is updated with these values in the object.

    const updateSalesExecutive = {//fetch the retrieved info to a variable
      fullname,
      email,
      address,
      phone,
      dob,
      qualification,
      basicsalary,
      gender,
    };

    await SalesExecutive.findByIdAndUpdate(Id, updateSalesExecutive);// update the details with the update variable where id = "Id"

    res.status(200).send("Done");//send status
  })
  .patch((err) => {
    console.log(err);
    res.status(500).json("Failed");//send status
  });

module.exports = router;
