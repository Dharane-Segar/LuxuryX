import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function DeliveryDriverReport() {
  const [deliverydrivers, setDeliveryDrivers] = useState([]);
  const componentPDF = useRef();

  useEffect(() => {
    function getDD() {
      axios
        .get(`http://localhost:8070/deliverydriver/getdd`)
        .then((res) => {
          console.log(res.data);
          setDeliveryDrivers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getDD();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "DeliveryDriverdata",
    onAfterPrint: () => {
      window.location.replace("/alldd");
    },
  });

  function close() {
    window.location.replace("/alldd");
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
              <h2 style = {{marginLeft:"400px"}}>
                Delivery Driver Report
              </h2>
              <table className="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">id</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Age</th>
                    <th scope="col">License No</th>
                    <th scope="col">Vehicle No</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Basic Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {deliverydrivers.map((deliverydriver) => (
                    <tr>
                      <th scope="row">{deliverydriver.did}</th>
                      <td>{deliverydriver.fullname}</td>
                      <td>{deliverydriver.email}</td>
                      <td>{deliverydriver.address}</td>
                      <td>{deliverydriver.phone}</td>
                      <td>{deliverydriver.age}</td>
                      <td>{deliverydriver.licenseno}</td>
                      <td>{deliverydriver.vehicleno}</td>
                      <td>{deliverydriver.nic}</td>
                      <td>{deliverydriver.basicsalary}</td>
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
