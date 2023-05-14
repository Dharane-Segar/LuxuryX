import React, { useState, useEffect, useRef} from "react";
import axios from "axios";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

import { useReactToPrint } from "react-to-print";

export default function AllSuppliers() {

    const componentPDF = useRef();

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
    }, []);
 
        const generatePDF = useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Supplier",
        onAfterPrint: () =>alert("Report was sent to print")
    });



    return (

        <div>
            <Header></Header>

            <div className="containerf">
                <AdminSideBar></AdminSideBar>
                <div className="container " style={{marginTop:"100px"}}>

                    <div ref={componentPDF} style={{width:'100%' }}> 

                    <h3>List of Suppliers Report</h3>
                    
                    <table className="table">
                        <thead>
                            <tr className="table-dark">

                                
                                <th scope='col'>Supplier Name</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Contact Number</th>
                                <th scope='col'>email</th>
                                <th scope='col'>Products Supplied</th>
                                
                                

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

                                        
                                   

                                                
                                            </tr>
                                        
                                    ))
                                
                            }


                        </tbody>
                        <div>
                        

                        </div>
                    </table>
                </div>
                <div className="d-grid d-md-flex justify-content-md-end mb-3">
                <button className="btn btn-primary" onClick={generatePDF}>Print Suppliers Report</button>
            </div>


            <Footer></Footer>
        </div >
        </div >
        </div >
    )
}