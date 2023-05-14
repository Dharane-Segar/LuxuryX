import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function SalesExecutiveReport() {
  const [salesexecutives, setSalesExecutives] = useState([]);
  const componentPDF = useRef();

  useEffect(() => {
    function getSE() {
      axios
        .get("http://localhost:8070/salesexecutive/getse")
        .then((res) => {
          console.log(res.data);
          setSalesExecutives(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getSE();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "SalesExecutivedata",
    onAfterPrint: () => {
      window.location.replace("/allse");
    },
  });

  function close() {
    window.location.replace("/allse");
  }
  return (
    <>
      <div id="login-modal">
        <div className="modalContainer">
          <div className="top-form">
            <div className="close-modal" onClick={close}>
              &#10006;
            </div>
          </div>
          <div className="login-form">
            <div ref={componentPDF} style={{ width: "70%" }}>
              <h2 style = {{marginLeft:"340px"}}>Sales Executive Report
              </h2>
              <table className="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">id</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Age</th>
                    <th scope="col">Qualification</th>
                    <th scope="col">Basic Salary</th>
                    <th scope="col">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {salesexecutives.map((salesexecutive) => (
                    <tr>
                      <th scope="row">{salesexecutive.sid}</th>
                      <td>{salesexecutive.fullname}</td>
                      <td>{salesexecutive.email}</td>
                      <td>{salesexecutive.password}</td>
                      <td>{salesexecutive.address}</td>
                      <td>{salesexecutive.phone}</td>
                      <td>{salesexecutive.age}</td>
                      <td>{salesexecutive.qualification}</td>
                      <td>{salesexecutive.basicsalary}</td>
                      <td>{salesexecutive.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />

            <a className="btn btn-primary" onClick={generatePDF}>
              Generate Report
            </a>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
