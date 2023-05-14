import React, { useState } from "react";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";
import axios from "axios";

export default function AddBills() {
  var [nameB, setNameB] = useState("");
  var [statusB, setStatusB] = useState("");
  var [amountB, setAmountB] = useState(0);
  var [dateB, setDateB] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newBill = {
      name: nameB,
      amount: amountB,
      status: statusB,
      date: dateB,

    };

    axios
      .post("http://localhost:8070/bills/insertBills", (e = newBill))
      .then(() => {
        alert("Transaction details added");
        window.location.replace("http://localhost:3000/bills");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Header></Header>

      <div className="containerf">
        <AdminSideBar></AdminSideBar>

        <div className="container1">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <br />
              <br />
              <br />
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    Add Bills
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={sendData}>
                    <div className="form-floating mb-3">
                      <label for="Name">Name</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                       
                        onChange={(e) => {
                            setNameB(e.target.value);
                        }}
                        required
                      />
                    </div>
                   
                    <div className="form-floating mb-3">
                      <label for="amount">Amount</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="amount"
                        
                        onChange={(e) => {
                            setAmountB(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <label for="status">Status</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="status"
                        
                        onChange={(e) => {
                            setStatusB(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <label for="date">Date</label>
                      <br />
                      <br />
                      <input
                        type="date"
                        class="form-control"
                        id="date"
                        
                        onChange={(e) => {
                            setDateB(e.target.value);
                        }}
                        required
                      />
                    </div>

                    


                    <div className="d-grid">
                      <button
                        type="submit"
                        class="btn btn-primary btn-block"
                        style={{ marginTop: "10px" }}
                      >
                        {" "}
                        Insert
                      </button>
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
  );
}
