import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accType, setAccType] = useState("");

  let navigate = useNavigate();

  async function send(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8070/login/log", {
          email,
          password,
          accType,
        })
        .then((res) => {
          if (res.data.type === "admin") {
            window.localStorage.setItem(
              "AdminInfo",
              JSON.stringify(res.data.check1)
            );
            console.log(res.data.check1.email);
            navigate("/adhome");
          } else if (res.data.type === "se") {
            window.localStorage.setItem(
              "SEInfo",
              JSON.stringify(res.data.check2)
            );
            navigate("/sehome");
          } else if (res.data.type === "dd") {
            window.localStorage.setItem(
              "DDInfo",
              JSON.stringify(res.data.check3)
            );
            navigate("/ddhome");
          } else if (res.data === "Not exist") {
            alert("No such user available");
          } else if (res.data === "Invalid Password") {
            alert("Invalid Password");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div id="layoutAuthentication1">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container2">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />
                  <br />
                  <br />
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Login
                      </h3>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-floating mb-3">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Type your user name"
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
                            placeholder="Type your password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>

                        <div>
                          <label>Type : &nbsp;</label>
                          <input
                            type="radio"
                            id="a"
                            name="type"
                            value="Admin"
                            onChange={(e) => {
                              setAccType(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="m"> &nbsp;&nbsp;Admin &nbsp;</label>
                          <input
                            type="radio"
                            id="s"
                            name="type"
                            value="Sales Executive"
                            onChange={(e) => {
                              setAccType(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="f">
                            {" "}
                            &nbsp;&nbsp;Sales Executive &nbsp;
                          </label>
                          <input
                            type="radio"
                            id="d"
                            name="type"
                            value="Delivery Driver"
                            onChange={(e) => {
                              setAccType(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="f">
                            {" "}
                            &nbsp;&nbsp;Delivery Driver
                          </label>
                          <br />
                        </div>

                        <br />
                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Login"
                            onClick={send}
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
    </div>
  );
}

export default Login;
