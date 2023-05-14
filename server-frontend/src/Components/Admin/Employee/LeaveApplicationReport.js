import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

export default function LeaveReport() {
  const componentPDF = useRef();
  const [leaves, setLeaves] = useState([]);
  const { query } = useParams();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Leavedata",
    onAfterPrint: () => {
      window.location.replace("/allleave");
    },
  });

  function close() {
    window.location.replace("/allleave");
  }

  useEffect(() => {
    function get() {
      axios
        .get("http://localhost:8070/leave/getleaves")
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
      <div id="login-modal">
        <div className="modalContainer">
          <div className="top-form">
            <div className="close-modal" onClick={close}>
              &#10006;
            </div>
          </div>
          <div className="login-form">
            <div ref={componentPDF} style={{ width: "85%" }}>
              <h2 style={{ marginLeft: "200px" }}>Leave Application Report of {query}</h2>
              <table className="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">Leave Id</th>
                    <th scope="col">eid</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Title</th>
                    <th scope="col">Days</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                {leaves
                .filter((l)=>l.startdate.includes(query))
                .map((l) => (
                  <tbody>
                    <tr>
                      <th scope="row">{l.Id}</th>
                      <td>{l.eid}</td>
                      <td>{l.fullname}</td>
                      <td>{l.title}</td>
                      <td>{l.days}</td>
                      <td>{l.startdate}</td>
                      <td>{l.enddate}</td>
                      <td>{l.reason}</td>
                      <td>{l.status}</td>
                    </tr>
                  </tbody>
                ))}
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
