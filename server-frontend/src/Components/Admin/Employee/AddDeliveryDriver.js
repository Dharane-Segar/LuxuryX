import React, { useState } from "react";
import axios from "axios";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";


function AddDeliveryDriver() {
  const [did, setDid] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [licenseno, setLicenseNo] = useState("");
  const [vehicleno, setVehicleNo] = useState("");
  const [nic, setNic] = useState("");
  const [basicsalary, setBasicSalary] = useState("");
  const [image, setImage] = useState("");
  const eid = did;

  function convert(e) {//function to convert image as url
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  async function sendData(e) {
    e.preventDefault();

    var input = document.getElementById("pswd").value;
    var em = document.getElementById("em").value;
    var d = document.getElementById("did").value;
    d = d.trim();
    em = em.trim();
    input = input.trim();

    var d1 = new Date(dob); 
    var d2 = new Date(); 
    var diff = d2.getTime() - d1.getTime(); 
    var daydiff = (diff / 31536000000).toFixed(0); 
    console.log(daydiff)

    if (input.length < 8) {
      alert("Password should consist atleast 8 chracters");
    } else if (d.startsWith("D") === false) {
      alert("did should start with D ");
    } else if (d.length !== 4) {
      alert("did should consist 4 characters");
    } else if (!input.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) {
      alert(
        "Password should contain a simple letter,a capital letter,a number or a special character"
      );
    } else if (!em.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      alert("Email invalid");
    } else if(daydiff < 21){
      alert("Employee's age should be greater than 21 ");
    }else if (
      !did ||
      !fullname ||
      !email ||
      !password ||
      !repassword ||
      !address ||
      !phone ||
      !dob ||
      !licenseno ||
      !vehicleno ||
      !nic ||
      !basicsalary 
    ) {
      alert("Fields can't be empty");
    } else if (password !== repassword) {
      alert("Password Mismatch");
    } else {
      await axios
        .post("http://localhost:8070/deliverydriver/adddd", {
          did,
          fullname,
          email,
          password,
          address,
          phone,
          dob,
          licenseno,
          vehicleno,
          nic,
          basicsalary,
          image,
        })
        .then((res) => {
          if (res.data === "Taken") {
            alert("User already available provide another email address ");
          } else if (res.data === "Id") {
            alert("User Id already taken please provide another id");
          } else {
            alert("Inserted new Delivery Driver");
            window.location.replace("/alldd");
          }
        })
        .catch((msg) => {
          alert(msg);
        });

      await axios
        .post("http://localhost:8070/t/det", { eid, email, basicsalary })
        .then((res) => {})
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div>
      <AdminDashBoard></AdminDashBoard>
      <div>
        <div>
          <main>
            <div className="container1">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />
                  <br />
                  <br />
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Add Delivery Driver
                      </h3>
                    </div>
                    <div className="card-body">
                      <form method="post">
                        <div className="form-floating mb-3">
                          <label>Delivery Driver Id :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            size={4}
                            id="did"
                            name="sid"
                            placeholder="Type employee id"
                            aria-required="true"
                            onChange={(e) => {
                              setDid(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <label>Full name :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="fullname"
                            placeholder="Type full name"
                            onChange={(e) => {
                              setFullname(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="email"
                            id="em"
                            name="email"
                            placeholder="Type email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Password :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="password"
                            id="pswd"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            name="password"
                            placeholder="Type password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Re-Type Password :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            name="password"
                            placeholder="Type password"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Address :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="address"
                            placeholder="Type addresss"
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Contact No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Type contact number"
                            pattern="[0-9]{10}"
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            required
                          ></input>
                        </div>

                        <div className="form-floating mb-3">
                          <label>Date of Birth :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="date"
                            name="age"
                            placeholder="Type age"
                            onChange={(e) => {
                              setDob(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>License No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="licenseno"
                            placeholder="Type license no"
                            onChange={(e) => {
                              setLicenseNo(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Vehicle No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="vehicleno"
                            placeholder="Type vehicle no"
                            onChange={(e) => {
                              setVehicleNo(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>NIC No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="nic"
                            placeholder="Type nic no"
                            onChange={(e) => {
                              setNic(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Basic Salary :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="basicsalary"
                            placeholder="Type basic salary"
                            onChange={(e) => {
                              setBasicSalary(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Add Image :</label>
                          <br />
                          <br />
                          <input
                            type="file"
                            placeholder="Add Image"
                            accept="image/"
                            filename="image"
                            onChange={convert}
                            required
                          />
                        </div>

                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            onClick={sendData}
                            value="Add"
                          ></input>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default AddDeliveryDriver;
