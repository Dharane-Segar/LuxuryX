import SalesExecutiveDashBoard from "./SalesExecutiveDashBoard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../Common/Footer";

function ViewSalarySE() {
  var user = JSON.parse(localStorage.getItem("SEInfo"));
  const [salaries, setSalaries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function get() {
      axios
        .get(`http://localhost:8070/salary/getEid/${user.sid}`)
        .then((res) => {
          console.log(res.data);
          setSalaries(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    get();
  }, []);
  return (
    <>
      <div>
        <SalesExecutiveDashBoard></SalesExecutiveDashBoard>
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <br />
              <br />
              <h2 style={{ marginLeft: "200px" }}>Salary Transactions</h2>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Type Date here"
                    aria-label="Search for..."
                    aria-describedby="btnNavbarSearch"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <br />
            <br />

            <table className="table">
              <thead>
                <tr className="table-dark">
                <th scope = "col">Id</th>
                  <th scope="col">OT Hrs</th>
                  <th scope="col">OT Rate</th>
                  <th scope="col">Net Salary</th>
                  <th scope="col">Payment Date</th>
                </tr>
              </thead>
              {salaries
                .filter((e) => e.paydate.toLowerCase().includes(query))
                .map((e) => (
                  <tbody>
                    <tr>
                    <td>{e.Id}</td>
                      <td>{e.othrs}</td>
                      <td>{e.otrate}</td>
                      <td>{e.netsalary}</td>
                      <td>{e.paydate}</td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ViewSalarySE;
