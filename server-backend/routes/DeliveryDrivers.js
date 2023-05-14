const router = require("express").Router();
const DeliveryDriver = require("../models/deliverydriver"); //import delivery driver model
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");


//CREATE function - create/adding a deliverydriver

router.post("/adddd", async (req, res) => {
  // get the body of the request and store the values in variables
  const did = req.body.did;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const phone = Number(req.body.phone);
  const dob = req.body.dob;
  const licenseno = req.body.licenseno;
  const vehicleno = req.body.vehicleno;
  const nic = req.body.nic;
  const basicsalary = Number(req.body.basicsalary);
  const image = req.body.image;
  var msg = "You are now an employee of LuxuryX. Your username is " + email + " and password is " + password

  try {
    const preuser = await DeliveryDriver.findOne({ email: email }); //check whether the email address already exists
    const useId = await DeliveryDriver.findOne({ did: did }); //check whether the did already exists
    console.log(preuser);

    if (preuser) {
      res.status(200).json("Taken"); //response in json format is sent to the frontend if email is already taken
    } else if(useId){
        res.status(200).json("Id");//response in json format is sent to the frontend if did is already taken
    }else {

      
        //send email
        try{
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
        const newDeliveryDriver = new DeliveryDriver({
          //creating object from deliverydriver model and assigning it to a const variable
          did,
          fullname,
          email,
          password:hashedpassword,
          address,
          phone,
          dob,
          licenseno,
          vehicleno,
          nic,
          basicsalary,
          image,
        });
  
        newDeliveryDriver.save(); //save the newly created object in the database using save function
        res.status(201).json(newDeliveryDriver); //response in json format is sent if above condition true(if object is passed)
        
      })
      
    }
  } catch (error) {
    //if unsuccess
    res.status(422).send({ status: "Email already taken" }); //catches error and send tthe error as a json object to the frontend
  }
});

//READ function - fetch data of all deliverydrivers

router.route("/getdd").get((req, res) => {
  //get is used to retrieve data from database
  DeliveryDriver.find() //find() method is used to fetch details of all deliverydrivers from the db
    .then((deliverydrivers) => {
      res.json(deliverydrivers); //if success, then a response is sent to front end(response is all delivery drivers)
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE function

router.route("/deletedd/:id").delete(async (req, res) => {
  let Id = req.params.id; //get the id from the request(parameter)
  await DeliveryDriver.findByIdAndDelete(Id) //delete the deliverydriver with whose id = Id
    .then(() => {
      res.status(200).json("success"); //send success message to the frontend
    })
    .catch((err) => {
      res.status(500).json("error"); //send error message to the frontend
    });
});

//Function to get the the deliverydriver details by their did

router.route("/getDid/:id").get(async (req, res) => {
  let id = req.params.id; //get the id from the request(parameter)

  await DeliveryDriver.findOne({ did: `${id}` }) //compare the did with the got id and return the details
    .then((dd) => {
      res.status(200).send({ status: "DD Details fetched", dd }); //send response as a json object and a status
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({ status: "Error with fetching DD details", error: err.message }); //send error message
    });
});

//UPDATE function

router.route("/update/:id").put(async (req, res) => {
    let Id = req.params.id; //get the id from the request(parameter)

    // get the body of the request and store the values in variables
    const {
      fullname,
      email,
      address,
      phone,
      dob,
      licenseno,
      vehicleno,
      nic,
      basicsalary,
    } = req.body;

    //This variable is the object to update. This object will be passed to the record of the variable "Id" and the respective id is updated with these values in the object.

    const updateDeliveryDriver = {//fetch the retrieved info to a variable
      fullname,
      email,
      address,
      phone,
      dob,
      licenseno,
      vehicleno,
      nic,
      basicsalary,
    };

    await DeliveryDriver.findByIdAndUpdate(Id, updateDeliveryDriver); // update the details with the update variable where id = "Id"

    res.status(200).send("Done"); //send status
  })
  .patch((err) => {
    console.log(err);
    res.status(500).json("Failed"); //send status
  });

module.exports = router;
