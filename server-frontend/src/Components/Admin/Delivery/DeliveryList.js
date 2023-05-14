import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminDashBoard from '../AdminDashBoard';
import Footer from '../../Common/Footer';
import DeliveryList2 from "./DeliveryList2";
import { useReactToPrint } from "react-to-print";

export default function DeliveryList() {
  const [Deliveries, setDeliveries] = useState([]);
  const [Keyword, setKeyword] = useState("");
  const componentPDF = useRef();

  useEffect(() => {
    function getDeliveries() {
      axios
        .get("http://localhost:8070/delivery/get")
        .then((res) => {
          console.log(res.data);
          setDeliveries(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getDeliveries();
  }, []);
  //Search functions
  const filteredDeliveries = Deliveries.filter((delivery) => {
    const Deliveryid = delivery.deliveryid.toLowerCase();
    const Orderid = delivery.orderid.toLowerCase();
    const Trackingid = delivery.trackingid.toLowerCase();
    const Deliveryaddress = delivery.deliveryaddress.toLowerCase();
    const keyword = Keyword.toLowerCase();

    return (
      Deliveryid.includes(keyword) ||
      Orderid.includes(keyword) ||
      Trackingid.includes(keyword) ||
      Deliveryaddress.includes(keyword)
    );
  });

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "DeliveryData",
    onAfterPrint: () => {
      window.location.replace("/DeliveryList");
    },
  });

  const renderDeliveriesList = filteredDeliveries.map((deliveries) => {
    return <DeliveryList2 deliveries={deliveries} />;
  });
  return (
    <>
      <div>
        <AdminDashBoard></AdminDashBoard>
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <br />
              <br />
              <br />
              <div className="row justify-content-center">
                <h2>Delivery List</h2>
              </div>

              <div>
                <input
                  type="text"
                  id="searchDelivery"
                  style={{ marginLeft: "250px" }}
                  placeholder="Enter Search Keyword"
                  value={Keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <a
                  className="btn btn-primary"
                  onClick={generatePDF}
                  style={{ marginLeft: "250px" }}
                >
                  Generate Report
                </a>
              </div>
            </div>

            <div ref={componentPDF}>
              <table className="table">
                <thead>
                  <tr className="table-dark" >
                    <th scope="col">
                      <center>Delivery Id</center>
                    </th>
                    <th scope="col">
                      <center>Order Id</center>
                    </th>
                    <th scope="col">
                      <center>Tracking Id</center>
                    </th>
                    <th scope="col">
                      <center>Delivery Driver Id</center>
                    </th>
                    <th scope="col">
                      <center>Delivery Address</center>
                    </th>
                    <th scope="col">
                      <center>Delivery Fee</center>
                    </th>
                    <th scope="col">
                      <center>Status</center>
                    </th>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>

                <tbody>{renderDeliveriesList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
