import DeliveryDriverDashBoard from "./DeliveryDriverDashBoard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../Common/Footer";

function ViewLeaveDD() {
  var user = JSON.parse(localStorage.getItem("DDInfo"));
  const [leaves, setLeaves] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function get() {
      axios
        .get(`http://localhost:8070/leave/getEid/${user.did}`)
        .then((res) => {
          console.log(res.data);
          setLeaves(res.data);
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
        <DeliveryDriverDashBoard></DeliveryDriverDashBoard>
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <br />
              <br />
              
              <h2 style={{ marginLeft: "200px" }}>My leaves</h2>
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
                    placeholder="Type Leave title here"
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
                  <th scope="col">Reason</th>
                  <th scope="col">Days</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              {leaves
                .filter((e) => e.reason.toLowerCase().includes(query))
                .map((e) => (
                  <tbody>
                    <tr>
                      <td>{e.reason}</td>
                      <td>{e.days}</td>
                      <td>{e.startdate.toString().slice(0,10)}</td>
                      <td>{e.enddate.toString().slice(0,10)}</td>
                      
                      <td>{e.status}</td>
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

export default ViewLeaveDD;
