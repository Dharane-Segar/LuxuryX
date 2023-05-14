import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";

export default function UpdateSalesExecutive() {
  const [Id, setId] = useState();
  const [sid, setSid] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [basicsalary, setBasicSalary] = useState("");
  const [gender, setGender] = useState("");

  const { id } = useParams();

  useEffect(() => {
    function GET() {
      axios
        .get(`http://localhost:8070/salesexecutive/getSid/${id}`)
        .then((res) => {
          setId(res.data.se._id);
          setSid(res.data.se.sid);
          setFullname(res.data.se.fullname);
          setEmail(res.data.se.email);
          setAddress(res.data.se.address);
          setPhone(res.data.se.phone);
          setDob(res.data.se.dob);
          setQualification(res.data.se.qualification);
          setBasicSalary(res.data.se.basicsalary);
          setGender(res.data.se.gender);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    GET();
  }, []);

  async function updateData(e) {
    e.preventDefault();
    var d1 = new Date(dob); 
    var d2 = new Date(); 
    var diff = d2.getTime() - d1.getTime(); 
    var daydiff = (diff / 31536000000).toFixed(0); 

    const newSalesExecutive = {
      fullname,
      email,
      address,
      phone,
      dob,
      qualification,
      basicsalary,
      gender,
    };

    if(daydiff < 21){
      alert("Employee's age should be greater than 21 ");
    }
    else{
      await axios
      .put(
        `http://localhost:8070/salesexecutive/update/${Id}`,
        newSalesExecutive
      )
      .then((res) => {
        if (res.data === "Done") {
          alert("Sales Executive updated successfully ");
          window.location.replace("/allse");
        } else {
          alert("Couldn't update sales executive");
          window.location.replace("/allse");
        }
      })
      .catch((msg) => {
        alert(msg);
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
                        Update Sales Executive
                      </h3>
                    </div>
                    <div className="card-body">
                      <form>
                        <>
                          <div className="form-floating mb-3">
                            <label>Sales executive Id :</label>
                            <br />
                            <br />

                            <input
                              className="form-control"
                              type="text"
                              value={sid}
                              name="sid"
                              placeholder="Type employee id"
                              aria-required="true"
                              readOnly
                            />
                          </div>
                          <div className="form-floating mb-3">
                            <label>Full name :</label>
                            <br />
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              value={fullname}
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
                              value={email}
                              name="email"
                              placeholder="Type email"
                              onChange={(e) => {
                                setEmail(e.target.value);
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
                              value={address}
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
                              value={phone}
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
                              value={dob}
                              placeholder="Type age"
                              onChange={(e) => {
                                setDob(e.target.value);
                              }}
                              required
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
                              value={qualification}
                              placeholder="Type qualification"
                              onChange={(e) => {
                                setQualification(e.target.value);
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
                              value={basicsalary}
                              placeholder="Type basic salary"
                              onChange={(e) => {
                                setBasicSalary(e.target.value);
                              }}
                              required
                            />
                          </div>
                          <br />
                          <div className="d-grid">
                            <input
                              type="submit"
                              className="btn btn-primary btn-block"
                              onClick={updateData}
                              value="Update"
                            ></input>
                          </div>
                        </>
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
