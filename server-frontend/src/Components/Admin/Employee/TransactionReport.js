import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

export default function TransactionReport() {
  const [transactions, setTransaction] = useState([]);
  const { query } = useParams();
  const componentPDF = useRef();

  useEffect(() => {
    function get() {
      axios
        .get("http://localhost:8070/salary/getsalary")
        .then((res) => {
          console.log(res.data);
          setTransaction(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    get();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Transaction Data",
    onAfterPrint: () => {
      window.location.replace("/allsalary");
    },
  });

  function close() {
    window.location.replace("/allsalary");
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
              <h2 id="topic" style = {{marginLeft:"280px"}}> 
                
                Transaction report of {query}
              </h2>
              <table className="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">Transaction Id</th>
                    <th scope="col">Eid</th>
                    <th scope="col">Employee type</th>
                    <th scope="col">Basic Salary</th>
                    <th scope="col">OT Hours</th>
                    <th scope="col">OT Rate</th>
                    <th scope="col">Net Salary</th>
                    <th scope="col">Payment Date</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions
                    .filter((t) => t.paydate.includes(query))
                    .map((t) => (
                      <tr>
                        <th scope="row">{t.Id}</th>
                        <td>{t.eid}</td>
                        <td>{t.type}</td>
                        <td>{t.basicsalary}</td>
                        <td>{t.othrs}</td>
                        <td>{t.otrate}</td>
                        <td>{t.netsalary}</td>
                        <td>{t.paydate}</td>
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
