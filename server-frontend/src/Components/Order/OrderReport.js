
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

import { useReactToPrint } from "react-to-print";


export default function AllOrder() {


    const componentPDF = useRef();

    const [orders, setOrder] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        function getOrder() {

            axios.get("http://localhost:8070/order/order").then((res) => {
                console.log(res.data);
                setOrder(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }

        getOrder();
    }, []);

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Order",
        onAfterPrint: () => alert("Data saved in Report")
    });

    return (
        <div>
            <Header></Header>



            <div className="containerf">
                <AdminSideBar></AdminSideBar>

                <div className="container">






                    <div>
                        <div ref={componentPDF} style={{ width: '100%' }}>
                            <h4>Orders Report</h4>
                            <table class="table ">

                                <thead>
                                    <tr className="table-dark">

                                        <th scope='col'>Order No</th>
                                        <th scope='col'>Product Name</th>
                                        <th scope='col'>Address</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Price</th>
                                        <th scope='col'>Status</th>



                                    </tr>
                                </thead>

                                <tbody>
                                    {

                                        orders.map((order) => (

                                            <tr scope="row">
                                                <td >{order.OrderNo}</td>
                                                <td >{order.ProductName}</td>
                                                <td >{order.Address}</td>
                                                <td >{order.Email}</td>
                                                <td >{order.Price}</td>
                                                <td >{order.Status}</td>


                                            </tr>

                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="d-grid d-md-flex justify-content-md-end mb-3">
                        <button className="btn btn-primary" onClick={generatePDF}>Print Order Report</button>

                    </div>

                </div>

            </div>


            <Footer></Footer>
        </div >
    )
}