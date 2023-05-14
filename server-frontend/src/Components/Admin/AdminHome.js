import React from "react";
import AdminDashBoard from "./AdminDashBoard";
import Footer from "../Common/Footer";

function AdHome() {

  return (
    <>
      <div>
        <AdminDashBoard></AdminDashBoard>

        <main>
          <div className="container-fluid px-4">
            <br />
            <br />
            <br />

            <img id="logo" src={require("../Common/images/logo.png")} />
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  );
}

export default AdHome;
