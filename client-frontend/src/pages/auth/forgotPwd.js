import React, { useState, useRef } from "react";
import axios from "axios";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useNavigate } from "react-router-dom";
const ForgotPasssword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log(email);
    axios
      .post("http://localhost:8071/user/sendotp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("Check your email for otp");
          navigate("/otp");
        } else {
          alert("Email / Server Error.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="sec2">
        <div className="container my-5">
          <h1>Forgot Password</h1>
          <form action="POST" id="forgotPwd">
            <div className="mb-3">
              <div className="mb-3">
                <label for="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div class="d-grid">
              <button
                type="button"
                class="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                SEND OTP
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasssword;
