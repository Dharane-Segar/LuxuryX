import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";
export default function UpdateDeliveryDriver() {
  const [Id, setId] = useState();
  const [did, setDid] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [licenseno, setLicenseNo] = useState("");
  const [vehicleno, setVehicleNo] = useState("");
  const [nic, setNic] = useState("");
  const [basicsalary, setBasicSalary] = useState("");

  const { id } = useParams();

  useEffect(() => {
    function GET() {
      axios
        .get(`http://localhost:8070/deliverydriver/getDid/${id}`)
        .then((res) => {
          setId(res.data.dd._id);
          setDid(res.data.dd.did);
          setFullname(res.data.dd.fullname);
          setEmail(res.data.dd.email);
          setAddress(res.data.dd.address);
          setPhone(res.data.dd.phone);
          setDob(res.data.dd.dob);
          setLicenseNo(res.data.dd.licenseno);
          setVehicleNo(res.data.dd.vehicleno);
          setNic(res.data.dd.nic);
          setBasicSalary(res.data.dd.basicsalary);
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

    const newDeliveryDriver = {fullname,
      email,
      address,
      phone,
      dob,
      licenseno,
      vehicleno,
      nic,
      basicsalary,
    };

    if(daydiff < 21){
      alert("Employee's age should be greater than 21 ");
    }else{
      await axios
      .put(
        `http://localhost:8070/deliverydriver/update/${Id}`,
        newDeliveryDriver
      )
      .then((res) => {
        if (res.data === "Done") {
          alert("Delivery Driver updated successfully ");
          window.location.replace("/alldd");
        } else {
          alert("Couldn't update Delivery Driver");
          window.location.replace("/alldd");
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
                        <div className="form-floating mb-3">
                          <label>Delivery Driver Id :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            pattern="[D][0-9][0-9][0-9]"
                            name="did"
                            value={did}
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
                            name="fullname"
                            placeholder="Type full name"
                            value={fullname}
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
                            name="email"
                            placeholder="Type email"
                            value={email}
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
                            placeholder="Type age"
                            value={dob}
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
                            value={licenseno}
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
                            value={vehicleno}
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
                            value={nic}
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
