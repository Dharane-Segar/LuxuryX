import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8071/user/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <Header />
      <div className="sec">
        <div className="container my-5">
          <h1>Login</h1>
          <form action="POST">
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div class="d-grid">
              <button
                type="button"
                class="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <br></br>
            <div class="d-grid">
              <button
                type="button"
                class="btn btn-primary btn-block"
                onClick={() => {
                  navigate("/pwd");
                }}
              >
                Forgot Password
              </button>
            </div>
            <Link to="/register" className="text">
              Don't have an account?
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;
