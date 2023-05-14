import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  let navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();
    var input = document.getElementById("pswd").value;
    var em = document.getElementById("em").value;
    em = em.trim();
    input = input.trim();

    if (input.length < 8) {
      alert("Password should consist atleast 8 chracters");
    } else if (!input.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) {
      alert(
        "Password should contain a simple letter,a capital letter,a number and a special character"
      );
    } else if (!em.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      alert("Email invalid");
    } else if (!fullname || !email || !password || !repassword) {
      alert("Fields can't be empty");
    } else if (password !== repassword) {
      alert("Password Mismatch");
    } else {
      await axios
        .post("http://localhost:8070/admin/addad", {
          fullname,
          email,
          password,
        })
        .then((res) => {
          if (res.data === "Taken") {
            alert("User already available provide another email address ");
          } else alert("Inserted new Admin");
          navigate("/login");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container2">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Admin Sign Up
                      </h3>
                    </div>
                    <div className="card-body">
                      <form method="post">
                        <div className="form-floating mb-3">
                          <label>Full Name :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Type your full name"
                            onChange={(e) => {
                              setFullname(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="email"
                            id="em"
                            placeholder="Type your email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Password :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="password"
                            id="pswd"
                            placeholder="Type your password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Re-Type Password :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Type your password"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                            }}
                          />
                        </div>

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            onClick={sendData}
                            value="Create Account"
                          ></input>
                        </div>

                        <br />

                        <div className="d-grid">
                          <a
                            className="btn btn-primary btn-block"
                            href="/login"
                          >
                            Already Have an account?
                          </a>
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
    </div>
  );
}

export default SignUp;
