import React, { useState } from "react";
import axios from "axios";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";


function AddSalesExecutive() {
  const [sid, setSid] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [basicsalary, setBasicSalary] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const eid = sid;

  function convert(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function demo1(){
    setSid("001")
    setFullname("Nimal Perera")
    setEmail("nimalp@gmail.com")
    setPassword("asdQWE123")
    setRePassword("asdQWE123")
    setAddress("Colombo")
    setPhone("0775523456")
    setDob("1997-05-07")
    setQualification("A/L")
    setGender("Male")
    setBasicSalary("15000")
  }

  function demo2(){
    setSid("S001")
    setFullname("Nimal Perera")
    setEmail("nimalp@gmail.com")
    setPassword("asdQWE123")
    setRePassword("asdQWE123")
    setAddress("Colombo")
    setPhone("0775523456")
    setDob("1997-05-07")
    setQualification("A/L")
    setGender("Male")
    setBasicSalary("15000")
  }

  function demo3(){
    setSid("S008")
    setFullname("Nimal Perera")
    setEmail("peterg@gmail.com")
    setPassword("asdQWE123")
    setRePassword("asdQWE123")
    setAddress("Colombo")
    setPhone("0775523456")
    setDob("1997-05-07")
    setQualification("A/L")
    setGender("Male")
    setBasicSalary("15000")
  }

  function demo4(){
    setSid("S008")
    setFullname("Nimal Perera")
    setEmail("nimalpgmail.com")
    setPassword("asdQWE123")
    setRePassword("asdQWE123")
    setAddress("Colombo")
    setPhone("0775523468")
    setDob("1997-05-07")
    setQualification("A/L")
    setGender("Male")
    setBasicSalary("15000")
  }

  function demo5(){
    setSid("S008")
    setFullname("Nimal Perera")
    setEmail("nimalp@gmail.com")
    setPassword("asdQWE123")
    setRePassword("asdQWE")
    setAddress("Colombo")
    setPhone("0775523468")
    setDob("1997-05-07")
    setQualification("A/L")
    setGender("Male")
    setBasicSalary("15000")
  }

  function demo6(){
    setSid("S008")
    setFullname("Nimal Perera")
    setEmail("nimalp@gmail.com")
    setPassword("asdQWE123")
    setRePassword("asdQWE123")
    setAddress("Colombo")
    setPhone("0775523468")
    setDob("2023-05-07")
    setQualification("A/L")
    setGender("Male")
    setBasicSalary("15000")
  }

  function demo7(){
    setSid("S008")
    setFullname("Nimal Perera")
    setEmail("nimalp@gmail.com")
    setPassword("asdQWE123")
    setRePassword("asdQWE123")
    setAddress("Colombo")
    setPhone("0775523468")
    setDob("1997-05-07")
    setQualification("A/L")
    setGender("Male")
    setBasicSalary("15000")
  }
  async function sendData(e) {
    e.preventDefault();

    var input = document.getElementById("pswd").value;
    input = input.trim();
    var em = document.getElementById("em").value;
    var s = document.getElementById("sid").value;
    s = s.trim();
    em = em.trim();
    var d1 = new Date(dob); 
    var d2 = new Date(); 
    var diff = d2.getTime() - d1.getTime(); 
    var daydiff = (diff / 31536000000).toFixed(0); 
    console.log(daydiff)


    if (input.length < 8) {
      alert("Password should consist atleast 8 chracters");
    } else if (!input.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) {
      alert(
        "Password should contain a simple letter,a capital letter,a number and a special character"
      );
    } else if (s.startsWith("S") === false) {
      alert("sid should start with S ");
    } else if (s.length !== 4) {
      alert("sid should consist 4 characters");
    } else if (!em.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      alert("Email invalid");
    }else if(daydiff < 21){
      alert("Employee's age should be greater than 21 ");
    } else if (
      !sid ||
      !fullname ||
      !email ||
      !password ||
      !repassword ||
      !address ||
      !phone ||
      !dob ||
      !qualification ||
      !basicsalary ||
      !gender
    ) {
      alert("Fields can't be empty");
    } else if (password !== repassword) {
      alert("Password Mismatch");
    } else {
      await axios
        .post("http://localhost:8070/salesexecutive/addse", {
          sid,
          fullname,
          email,
          address,
          phone,
          password,
          dob,
          qualification,
          basicsalary,
          gender,
          image,
        })
        .then((res) => {
          if (res.data === "Taken") {
            alert("User already available provide another email address ");
          } else if (res.data === "Id") {
            alert(" Sid already taken please provide another id");
          } else {
            alert("Inserted new Sales Executive");
            window.location.replace("/allse");
          }
        })
        .catch((err) => {
          alert(err);
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
                  <br/>
                  {/*<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo1}
                            value="1"
                          ></input>

<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo2}
                            value="2"
                          ></input>

<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo3}
                            value="3"
                          ></input>

<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo4}
                            value="4"
                          ></input>

<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo5}
                            value="5"
                          ></input>

<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo6}
                            value="6"
                          ></input>

<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo7}
                            value="7"
  ></input>*/}
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Add Sales Executive
                      </h3>
                    </div>
                    <div className="card-body">
                      <form method="post">
                        <div className="form-floating mb-3">
                          <label>Sales executive Id :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="sid"
                            id="sid"
                            pattern="[S][0-9][0-9][0-9]"
                            placeholder="Type employee id"
                            aria-required="true"
                            onChange={(e) => {
                              setSid(e.target.value);
                            }}
                            value={sid}
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
                            value={fullname}
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
                            name="email"
                            id="em"
                            placeholder="Type email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            value={email}
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
                            value = {password}
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
                            name="repassword"
                            placeholder="Type password"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                            }}
                            value = {repassword}
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
                            value = {address}
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
                            value = {phone}
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
                            id="dob"
                            placeholder="Type age"
                            onChange={(e) => {
                              setDob(e.target.value);
                            }}
                            required
                            value={dob}
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Qualification :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="qualification"
                            placeholder="Type qualification"
                            onChange={(e) => {
                              setQualification(e.target.value);
                            }}
                            required
                            value = {qualification}
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
                            value = {basicsalary}
                            required
                          />
                        </div>
                        <br />

                        <div>
                          <label>Gender : &nbsp;</label>
                          <input
                            type="radio"
                            id="m"
                            name="gender"
                            value="Male"
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="m"> &nbsp;&nbsp;Male &nbsp;</label>
                          <input
                            type="radio"
                            id="f"
                            name="gender"
                            value="Female"
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                            required
                            
                          ></input>
                          <label htmlFor="f"> &nbsp;&nbsp;Female</label>
                          <br />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Add Image :</label>
                          <br />
                          <br />
                          <input
                            type="file"
                            placeholder="Add Image"
                            accept="image/"
                            onChange={convert}
                            required
                          />
                        </div>

                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn btn-primary"
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

export default AddSalesExecutive;
