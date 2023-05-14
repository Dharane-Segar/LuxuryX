import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import AdminDashBoard from "./AdminDashBoard";
import Footer from "../Common/Footer";

function RegCustomers() {
  const componentPDF = useRef();
  const [userData, setUserdata] = useState([]);
  //using useeffect to show all  the fetched registered customers
  useEffect(() => {
    getUserData();
  }, []);
  //get all the registered users
  const getUserData = async () => {
    const registerUserdata = async () => {
      axios
        .get("http://localhost:8070/user/")
        .then((res) => setUserdata(res.data))
        .catch((error) => console.log(error));
    };
    registerUserdata();
  };
  //function to generate pdf
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "RegisteredUsers",
    onAfterPrint: () => window.location.replace("/customer"),
  });

  //fetch search function from backend
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8070/user/search/${key}`);
      result = await result.json();
      if (result) {
        setUserdata(result);
      }
    } else {
      getUserData();
    }
  };

  return (
    <div>
      <AdminDashBoard></AdminDashBoard>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <br />
            <br />

            <div className="row justify-content-center"><h2 style={{ marginLeft: "140px" }}>Customer List</h2></div>

            <div>
              <input
                type="text"
                id="searchDelivery"
                style={{ marginLeft: "300px" }}
                placeholder="search registered user"
                onChange={searchHandle}
              />
              

              <a
                className="btn btn-primary"
                style={{ marginLeft: "200px" }}
                onClick={generatePDF}
                id="pdf"
              
              >
                Generate Report
              </a>
            </div>
          </div>
            
          <br />

          <div ref={componentPDF} style={{ width: "100%" }}>
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th>Customer No</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Contact</th>
                  
                </tr>
              </thead>

              <tbody>
                {userData.map((uData, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{uData.fname}</td>
                    <td>{uData.email}</td>
                    <td>{uData.address}</td>
                    <td>{uData.contact}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default RegCustomers;
