import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import DeliveryDriverDashBoard from './DeliveryDriverDashBoard';
import Footer from "../Common/Footer";
import DeliveryDriverView2 from './DeliveryDriverView2';
import { useReactToPrint } from "react-to-print";


export default function DeliveryDriverView() {

  const [Deliveries, setDeliveries] = useState([]);
  const [Keyword, setKeyword] = useState('');
  const componentPDF = useRef();

  var user = JSON.parse(localStorage.getItem("DDInfo"));


  useEffect(() => {
    function getDeliveries() {
      axios.get(`http://localhost:8070/delivery/getDeliDid/${user.did}`).then((res) => {
        console.log(res.data);
        setDeliveries(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getDeliveries();
  }, [])

  //Search functions 
  const filteredDeliveries = Deliveries.filter((delivery) => {
    const Deliveryid = delivery.deliveryid.toLowerCase()
    const Orderid = delivery.orderid.toLowerCase()
    const Trackingid = delivery.trackingid.toLowerCase()
    const Deliveryaddress = delivery.deliveryaddress.toLowerCase()
    const DeliveryDriverid = delivery.did.toLowerCase()
    // const Deliveryfee = delivery.deliveryfee.toLowerCase()
    const keyword = Keyword.toLowerCase()
    
    return (Deliveryid.includes(keyword) || Orderid.includes(keyword) || Trackingid.includes(keyword) || Deliveryaddress.includes(keyword)) ||  DeliveryDriverid.includes(keyword) //|| Deliveryfee.includes(keyword)
  })


  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "DeliveryDriverData",
    onAfterPrint: () => {
      window.location.replace("/deliveryDriverView");
    },
  });


  const renderDeliveriesList = filteredDeliveries.map((deliveries) => {
    return (
      <DeliveryDriverView2 deliveries={deliveries} />
    )
  })
  return (
    
    <>
      <div>
        <DeliveryDriverDashBoard></DeliveryDriverDashBoard>
        <div className="mt-5">

          <div className="container">
            <div className="abc">
              <br /><br /><br />
              <div>
                <h2 style = {{marginLeft:"250px"}}>My Deliveries</h2>
              </div>
              <div>
                <input type="text" id='searchDelivery' style = {{marginLeft:"250px"}}placeholder='Enter Search Keyword' value={Keyword} onChange={(e) => setKeyword(e.target.value)} />
                <a className="btn btn-primary" onClick={generatePDF} style = {{marginLeft:"250px"}}>
                  Generate Report
                </a>
              </div>
            </div>
          </div>

          <div ref={componentPDF}>
            <br/>
            <table className="table" style={{width:"80%",marginLeft:"250px"}}>
              <thead>
                <tr className="table-dark">
                  <th><center>Delivery Id</center></th>
                  <th scope='col'><center>Order Id</center></th>
                  <th scope='col'><center>Tracking Id</center></th>
                  <th scope='col'><center>Delivery Driver Id</center></th>
                  <th scope='col'><center>Delivery Address</center></th>
                  <th scope='col'><center>Delivery Fee</center></th>
                  <th scope='col'><center>Status</center></th>
                  <th scope='col'>&nbsp;</th>
                  <th scope='col'>&nbsp;</th>
                  <th scope='col'>&nbsp;</th>
                </tr>
              </thead>

              <tbody>

                {renderDeliveriesList}

              </tbody>

            </table>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </>
  )

}