import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [fname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  //function to register user
  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      fname,
      email,
      password,
      address,
      contact,
    };
    axios
      .post("http://localhost:8071/user/register", newUser)
      .then(() => {
        toast.success("Registered successfully 😃!", {
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.warn("Invalid details 👎!", {
          position: "top-center",
        });
      });
  }
  return (
    <Layout>
      <div class="section">
        <div className="container my-5">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your name"
                name="fname"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password"
                name="password"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleAddress" className="form-label">
                Your Address
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter Your address"
                name="address"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputContact" className="form-label">
                Your Contact No
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                className="form-control"
                id="exampleInputContact"
                placeholder="Enter Your Contact No"
                name="contact"
                required
              />
            </div>

            <div class="d-grid">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
            <Link to="/login" className="text">
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
