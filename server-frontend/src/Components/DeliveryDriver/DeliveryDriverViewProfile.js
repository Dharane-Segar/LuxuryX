import React from "react";
import DeliveryDriverDashBoard from "./DeliveryDriverDashBoard";
import Footer from "../Common/Footer";

function ViewProfileDD() {
  var user = JSON.parse(localStorage.getItem("DDInfo"));
  return (
    <div>
      <DeliveryDriverDashBoard></DeliveryDriverDashBoard>
      <br />
      <br />
      <br />
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4" style = {{marginLeft : "100px"}}>
          <div className=" image d-flex flex-column justify-content-center">
            <img id="pic" src={user.image} />
            <h1 style={{ color: "red" }}>{user.fullname}</h1>
            <h3>Email &nbsp;: {user.email}</h3>
            <h3>Address&nbsp;: {user.address}</h3>
            <h3>Contact No&nbsp;: {user.phone}</h3>
            <h3>DOB&nbsp;: {user.dob.toString().slice(0,10)}</h3>
            <h3>License No&nbsp;: {user.licenseno}</h3>
            <h3>Vehicle No&nbsp;: {user.vehicleno}</h3>
            <h3>NIC&nbsp;:{user.nic}</h3>
            <h3>Basic Salary&nbsp;: {user.basicsalary}</h3>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}

export default ViewProfileDD;
