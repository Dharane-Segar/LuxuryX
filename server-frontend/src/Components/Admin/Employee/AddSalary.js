import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";

export default function AddSalary() {
  var [type, setType] = useState("");
  const [eid, setEid] = useState("");
  const [basicsalary, setBasicSalary] = useState("");
  const [othrs, setOTHrs] = useState("");
  const [otrate, setOTRate] = useState("");
  var [paydate, setPaydate] = useState("");
  var [netsalary, setNetSalary] = useState("");
  const [email, setEmail] = useState("");
  var [search, setSearch] = useState("");

  function demo(){
    setOTRate("0.2")
    setOTHrs("10")
    setPaydate("2023-05-07")

  }

  function check() {
    search = search.toUpperCase();
    axios
      .get(`http://localhost:8070/t/get/${search}`)
      .then((res) => {
        console.log(res.data);
        setEid(res.data.t.eid);
        setEmail(res.data.t.email);
        setBasicSalary(res.data.t.basicsalary);
        if (search.startsWith("S")) {
          setType("Sales Executive");
        } else if (search.startsWith("D")) {
          setType("Delivery Driver");
        }
      })
      .catch((err) => {
        setSearch("");
        alert("No such Employee Id exists");
      });
  }

  async function Calculation(e) {
    const r = Number(otrate);
    const b = Number(basicsalary);
    const h = Number(othrs);
    var val = (r / 100) * b;
    netsalary = b + h * val;
    setNetSalary(netsalary);

    e.preventDefault();
    await axios
      .post("http://localhost:8070/salary/addsal", {
        type,
        eid,
        basicsalary,
        othrs,
        otrate,
        paydate,
        netsalary,
        email,
      })
      .then((res) => {
        if (res.data === "Success") {
          alert("Inserted new salary transaction ");
          window.location.replace("/allsalary");
        } else if (res.data === "No id") {
          alert("Couldn't find Employee id");
        } else {
          alert("Error in inserting");
        }
      })
      .catch((msg) => {
        alert(msg);
      });
  }

  return (
    <>
      <div>
        <AdminDashBoard></AdminDashBoard>
        <div>
          <div className="container1">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <br />
                <br />
                <br />
                <br />

                {/*<input
                            type="submit"
                            className="btn btn-primary"
                            onClick={demo}
                            value="demo"
  ></input>*/}

                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                  <div className="input-group">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type Employee Id here"
                      aria-label="Search for..."
                      aria-describedby="btnNavbarSearch"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <input
                      type="button"
                      className="btn btn-primary"
                      id="btnNavbarSearch"
                      value="Search"
                      onClick={check}
                    ></input>
                  </div>
                </form>

                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Add Salary
                    </h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <br />

                      <div className="form-floating mb-3">
                        <label>Employee Type:</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="text"
                          value={type}
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>Employee Id :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="text"
                          value={eid}
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>Basic Salary :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="text"
                          value={basicsalary}
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <label>OT Hrs :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            setOTHrs(e.target.value);
                          }}
                          value = {othrs}
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>OT Rate :</label>
                        <br />
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setOTRate(e.target.value);
                          }}
                          value = {otrate}
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>Payment Date:</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          id="pdate"
                          type="date"
                          onChange={(e) => {
                            setPaydate(e.target.value);
                          }}
                          value  = {paydate}
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>Net Salary :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="text"
                          value={netsalary}
                        />
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          onClick={Calculation}
                        >
                          Add transaction
                        </button>
                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
