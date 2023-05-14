import React, { useState } from "react";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";
import axios from "axios";

export default function AddSupplier() {
    var [type, setType] = useState("");
    var [category, setCategory] = useState("");
    var [amount, setAmount] = useState(0);
    var [remark, setRemark] = useState("");
    var [date, setDate] = useState("");
    var [name, setName] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newSupplier = {
        name: name,
        type: type,
        category: category,
        amount: amount,
        remark: remark,
        date: date,
        did: ""
    };

    axios
      .post("http://localhost:8070/financeTransaction/insertT", (e = newSupplier))
      .then(() => {
        alert("Transaction details added");
        window.location.replace("http://localhost:3000/financeTrans");
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
                    Add Transaction
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
                            setName(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="form-floating mb-3">
                        <select name="" id="select" placeholder='Type' value={type} onChange={(e) => { setType(e.target.value); }}>
                            <option value="">--Select a type--</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                      <label for="Category">Category</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="Category"
                        
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <label for="Amount">Amount</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="Amount"
                        
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <label for="Remark">Remark</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="Remark"
                        
                        onChange={(e) => {
                            setRemark(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <label for="Date">Date</label>
                      <br />
                      <br />
                      <input
                        type="date"
                        class="form-control"
                        id="Date"
                        
                        onChange={(e) => {
                            setDate(e.target.value);
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
