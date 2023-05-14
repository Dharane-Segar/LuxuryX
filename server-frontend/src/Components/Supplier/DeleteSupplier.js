import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

export default function DeleteSupplier() {
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [email, setemail] = useState("");
    const [productsSupplied, setproductsSupplied] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/supplier/getsupplier/${id}`).then((res) =>{
            console.log(res.data);
            setname(res.data.suppliers.name);
            setaddress(res.data.suppliers.address);
            setcontactNumber(res.data.suppliers.contactNumber);
            setemail(res.data.suppliers.email);
            setproductsSupplied(res.data.suppliers.productsSupplied);
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    function deleteData(e) {
        e.preventDefault();

        axios.delete(`http://localhost:8070/supplier/deletesupplier/${id}`).then(() => {
            alert("Supplier details deleted");
            window.location.replace("http://localhost:3000/supplier");

        }).catch((err) => {
            alert(err)
        })

    }
    return (
        <div>
            <div>
            <Header></Header>



            <div className="containerf">
                <AdminSideBar></AdminSideBar>

            <div className="container" style={{marginTop:"100px",marginLeft:"520px"}}>
                <br></br>
                {/* <h3>{id}</h3> */}
                <form onSubmit={deleteData} >
                    <h3 style = {{marginRight:"500px"}}>Delete Supplier Information </h3>
                    <div class="form-row" >
                        
                        <div class="col-md-6">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" value={name} disabled onChange={(e) => {
                                setname(e.target.value);
                            }} required />
                        </div>
                    
                        <div class="col-md-6">
                            <label for="address" class="form-label">address</label>
                            <input type="text" class="form-control" id="address" value={address} disabled onChange={(e) => {
                                setaddress(e.target.value);
                            }} required />
                        </div>
                                       
                        <div class="col-md-6">
                            <label for="contactNumber" class="form-label">contact Number</label>
                            <input type="text" class="form-control" id="contactNumber" value={contactNumber} disabled onChange={(e) => {
                                setcontactNumber(e.target.value);
                            }} required />
                        </div>

                        <div class="col-md-6">
                            <label for="email" class="form-label"> email</label>
                            <input type="text" class="form-control" id="email" value={email} disabled onChange={(e) => {
                                setemail(e.target.value);
                            }} required />
                        </div>

                        <div class="col-md-6">
                            <label for="productsSupplied" class="form-label"> Products Supplied</label>
                            <input type="text" class="form-control" id="productsSupplied" value={productsSupplied} disabled onChange={(e) => {
                                setproductsSupplied(e.target.value);
                            }} required />
                        </div>
                    
                    </div>
                    <button type="submit" class="btn btn-danger" style={{marginTop:"10px"}} >Remove <i class="fa fa-trash-o fa-lg"></i></button>

                    <a href="/supplier" type="button" class="btn btn-secondary" style={{ marginTop:"30px", marginLeft: "250px" }}>back <i class="fa fa-reply"></i></a>
                </form>
            </div>
            </div>
            <Footer></Footer>
            </div>
        </div>
    )

}