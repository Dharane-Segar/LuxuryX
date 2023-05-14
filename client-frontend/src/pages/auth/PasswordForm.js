import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
const PasswordForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8071/user/submitotp", {
        otp,
        password,
      });
      if (res && res.data.success) {
        alert("Password changed successfully");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="sec">
        <div className="container my-5">
          <h1>Set New Password</h1>
          <form action="POST">
            <div className="mb-3">
              <label for="email" className="form-label">
                Otp
              </label>
              <input
                type="email"
                className="form-control"
                name="otpCode"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                value={otp}
                placeholder="Enter otp code"
              />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
              />
            </div>
            <div class="d-grid">
              <button
                type="button"
                class="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                CHANGE PASSWORD
              </button>
            </div>
            <br></br>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default PasswordForm;
