import React from "react";
import DeliveryDriverDashBoard from "./DeliveryDriverDashBoard";
import Footer from "../Common/Footer";

function DDHome() {
  
  return (
    <>
      <div>
        <DeliveryDriverDashBoard></DeliveryDriverDashBoard>

        <main>
          <div className="container-fluid px-4">
            <br />
            <br />
            <br />
            <img id="logo" src={require("../Common/images/logo.png")} />
            <br />
            <br />
            <br />
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}

export default DDHome;
