import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Footer from "../Common/Footer";


export default function AllSuppliers() {

    const [eid, setEid] = useState("");
    const [suppliers, setSuppliers] = useState([]);


    useEffect(() => {
        function getSuppliers() {
            axios.get("http://localhost:8070/supplier/supplier").then((res) => {
                console.log(res.data);
                setSuppliers(res.data);
            }).catch((err) => {
                alert(err.message)
            })
        }
        getSuppliers();
    }, [])


    return (

        <div>
            <Header></Header>

            <div className="containerf">
                <AdminSideBar></AdminSideBar>
                <div className="container" style={{marginTop:"100px"}}>
                    <h3 style={{marginBottom:"80px"}}>List of Suppliers</h3>
                    <div style={{ textAlign: 'right' }}>
                        <button style={{ marginBottom: "10px", marginLeft: "auto" }} className="btn btn-primary" onClick={() => {
                            window.location.replace(`http://localhost:3000/supplierReport`);
                        }}>Generate Supplier Report</button>
                    </div>
                    
        
                        
                    
                    <table className="table">
                        <thead>
                            <tr className="table-dark">

                                
                                <th scope='col'>Supplier Name</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Contact Number</th>
                                <th scope='col'>email</th>
                                <th scope='col'>Products Supplied</th>
                                <th scope='col'>Operations</th>
                                

                            </tr>
                        </thead>

                        <tbody>

                            {
                                suppliers.map((supplier) => (
                                    
                                            <tr scope="row">
                                                
                                                <td >{supplier.name}</td>
                                                <td >{supplier.address}</td>
                                                <td >{supplier.contactNumber}</td>
                                                <td >{supplier.email}</td>
                                                <td >{supplier.productsSupplied}</td>

                                        
                                        <td >
                                            <button className="btn btn-secondary" onClick={()=>{
                                                window.location.replace(`http://localhost:3000/updatesupplier/${supplier._id}`)
                                            }}><CreateIcon /></button>
                                       
                                            <button className="btn btn-danger" onClick={()=>{
                                                window.location.replace(`http://localhost:3000/deletesupplier/${supplier._id}`)
                                            }}><DeleteOutlineIcon /></button>

                                        </td>

                                                
                                            </tr>
                                        
                                    ))
                                
                            }


                        </tbody>
                        <div>
                        

                        </div>
                    </table>
                </div>
            </div>


            <Footer></Footer>
        </div >

    )
}