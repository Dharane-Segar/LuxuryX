import React, { useState } from "react";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";
import axios from "axios";

export default function AddSupplier() {
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [email, setemail] = useState("");
  const [productsSupplied, setproductsSupplied] = useState("");

  function sendData(e) {
    e.preventDefault();

    if (!name || !address || !contactNumber || !email || !productsSupplied) {
      alert("Please fill in all required fields");
      return;
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      alert("Please enter a valid email address");
      return;
  }

  if (!/^\d{10}$/.test(contactNumber)) {
      alert("Please enter a valid 10-digit contact number");
      return;
        }

    const newSupplier = {
      name,
      address,
      contactNumber,
      email,
      productsSupplied,
    };

    axios
      .post("http://localhost:8070/supplier/addsupplier", (e = newSupplier))
      .then(() => {
        alert("Supplier details added");
        window.location.replace("http://localhost:3000/supplier");
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
                    Add Supplier Details
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={sendData}>
                    <div className="form-floating mb-3">
                      <label for="Name">Supplier Name</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <label for="address">Supplier Address</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <label for="contactNumber">Contact Number</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="contactNumber"
                        value={contactNumber}
                        onChange={(e) => {
                          setcontactNumber(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <label for="email">Supplier email</label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <label for="productsSupplied">Products Supplied </label>
                      <br />
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="productsSupplied"
                        value={productsSupplied}
                        onChange={(e) => {
                          setproductsSupplied(e.target.value);
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
                        Insert Data
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
