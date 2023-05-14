import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

export default function SearchSupplierTransaction() {
    const { InvoiceNo } = useParams();
    const [supplierTransactions, setsupplierTransactions] = useState([]);

    useEffect(() => {
       
        function getSupplierTransaction() {
            axios.get(`http://localhost:8070/supplierTransaction/getsupplierTransaction/${InvoiceNo}`).then((res) => {
                console.log(res.data);
                setsupplierTransactions(res.data.SupplierTransaction);
            
                console.log(supplierTransactions);
            }).catch((err) => {
                alert(err.message)
            })
        }






        getSupplierTransaction();
    }, [])

    return (

        <div>
        <Header></Header>

        <div className="containerf">
            <AdminSideBar></AdminSideBar>

        <div className="container" style={{marginTop:"150px"}}>
            <table className="table">
            <thead>
                <tr className="table-dark">
                    <th>Invoice No</th>
                    <th>Supplied Date</th>
                    <th>Supplier</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Amount </th>
                    <th>Operations</th>

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
                                <td>
                                    <button className="btn btn-success" onClick={() => {
                                        window.location.replace(`http://localhost:3000/updatesupplierTransaction/${supplierTransaction._id}`)
                                    }}>Update</button>

                                    <button className="btn btn-danger" onClick={() => {
                                        window.location.replace(`http://localhost:3000/deletesupplierTransaction/${supplierTransaction._id}`)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
          
            
            <div style={{textAlign: 'right' }}>
            <a href="/supplierTransaction" type="button" class="btn btn-primary float-right" style={{ marginTop:"100px" ,marginRight: "40px", width: "8%" }}>back</a>
            </div>



        </div>
        </div>
        <Footer></Footer>
        </div>

    )
}