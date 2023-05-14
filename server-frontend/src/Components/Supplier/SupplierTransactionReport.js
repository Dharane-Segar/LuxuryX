
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

import { useReactToPrint } from "react-to-print";


export default function AllSupplierTransaction() {


    const componentPDF = useRef();

    const [supplierTransactions, setSupplierTransaction] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        function getSupplierTransaction() {

            axios.get("http://localhost:8070/supplierTransaction/supplierTransaction").then((res) => {
                console.log(res.data);
                setSupplierTransaction(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }

        getSupplierTransaction();
    }, []);

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "SupplierTransaction",
        onAfterPrint: () => window.location.replace("/supplierTransaction")
    });
   
    return (
        <div>
            <Header></Header>



            <div className="containerf">
                <AdminSideBar></AdminSideBar>

                <div className="container" style={{marginTop:"100px"}}>

                    <div>
                        <div ref={componentPDF} style={{ width: '100%' }}>
                            <h4>Supplier Transactions Report</h4>
                            
                            <table class="table ">

                                <thead>
                                    <tr className="table-dark">

                                        <th scope='col'>Invoice No</th>
                                        <th scope='col'>Supplied Date</th>
                                        <th scope='col'>Supplier</th>
                                        <th scope='col'>Product Name</th>
                                        <th scope='col'>Quantity</th>
                                        <th scope='col'>Amount</th>



                                    </tr>
                                </thead>

                                <tbody>
                                    {

                                        supplierTransactions.map((supplierTransaction) => (

                                            <tr scope="row">
                                                <td >{supplierTransaction.InvoiceNo}</td>
                                                <td >{supplierTransaction.SuppliedDate}</td>
                                                <td >{supplierTransaction.Supplier}</td>
                                                <td >{supplierTransaction.ProductName}</td>
                                                <td >{supplierTransaction.Quantity}</td>
                                                <td >{supplierTransaction.Amount}</td>


                                            </tr>

                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="d-grid d-md-flex justify-content-md-end mb-3">
                        <button className="btn btn-primary" onClick={generatePDF}>Print Transaction Report</button>

                    </div>

                </div>

            </div>


            <Footer></Footer>
        </div >
    )
}