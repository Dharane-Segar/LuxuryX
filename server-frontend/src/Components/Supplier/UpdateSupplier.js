import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

export default function UpdateSupplier() {

    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [email, setemail] = useState("");
    const [productsSupplied, setproductsSupplied] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/supplier/getsupplier/${id}`).then((res) => {
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

    function updateData(e) {
        e.preventDefault();

        const newSupp = {
            name,
            address,
            contactNumber,
            email,
            productsSupplied
        }

        axios.put(`http://localhost:8070/supplier/updatesupplier/${id}`,newSupp).then(() => {
            alert("Supplier details updated");
            window.location.replace("http://localhost:3000/supplier");

        }).catch((err) => {
            alert(err)
        })

    }
    return (

        <div >
            <Header></Header>

            <div className="containerf">
                <AdminSideBar></AdminSideBar>
            <div className="container" style={{marginTop:"100px",marginLeft:"520px", marginRight:"500px"}}>
            
            <form onSubmit={updateData}>
                        <h3>Update Supplier Details</h3>
                        <br></br>
                        <br>
                        </br>

                        <div className="form-group">
                            <label for="Name">Supplier Name</label>
                            <input type="text" class="form-control" id="name" value={name} onChange={(e) => {
                                setname(e.target.value);
                            }} required />
                            

                        </div>
                        <div className="form-group">
                            <label for="address">Supplier Address</label>
                            <input type="text" class="form-control" id="address" value={address} onChange={(e) => {
                                setaddress(e.target.value);
                            }} required />
                            
                        </div>

                        <div className="form-group">
                            <label for="contactNumber">Contact Number</label>
                            <input type="text" class="form-control" id="contactNumber" value={contactNumber} onChange={(e) => {
                                setcontactNumber(e.target.value);
                            }} required />

                            
                        </div>

                        <div className="form-group">
                            <label for="email">Supplier email</label>
                            <input type="text" class="form-control" id="email" value={email} onChange={(e) => {
                                setemail(e.target.value);
                            }} required />

                            
                        </div>

                        <div className="form-group">
                            <label for="productsSupplied">Products Supplied</label>
                            <input type="text" class="form-control" id="productsSupplied" value={productsSupplied} onChange={(e) => {
                                setproductsSupplied(e.target.value);
                            }} required />

                            
                        </div>

                        <button type="submit" class="btn btn-primary" style={{marginTop:"10px"}}>Update <i class="fa fa-check"></i></button>

                        
                    </form>

        </div>
        </div>
        <Footer></Footer>
        </div>

    )

}
    
