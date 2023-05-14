import React, { useState, useEffect } from "react";
import Header from "../SalesExecutive/Header";
import SalesExecutiveSideBar from "../SalesExecutive/SalesExecutiveSideBar";
import axios from 'axios';
import Footer from "../Common/Footer"

export default function AddCoupon() {
    const [code, setcode] = useState("");
    const [expiryDate, setexpiryDate] = useState("");
    const [usageLimit, setusageLimit] = useState("");
    const [usedCount, setusedCount] = useState("");
    const [discountPercentage, setdiscountPercentage] = useState("");
    const [product, setproduct] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8070/coupon/coupon").then((res) => {
            console.log(res.data);
            //setInventories(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }, [])



    function sendData(e) {
        e.preventDefault();

        const newCoupon = {
            code,
            expiryDate,
            usageLimit,
            usedCount,
            discountPercentage,
            product
        }

        axios.post("http://localhost:8070/coupon/addcoupon", e = newCoupon).then(() => {
            alert("New Coupon detail added");

            setcode("");
            setusageLimit("");
            setexpiryDate("");
            setusedCount("");
            setdiscountPercentage("");
            setproduct("");

            window.location.replace("http://localhost:3000/coupon");
        }).catch((err) => {
            alert(err)
        })
    }

    function demo(e) {
        setcode("C0002");
        setexpiryDate("2023-04-18");
        setusageLimit("10");
        setusedCount("4");
        setdiscountPercentage("15/100");
        setproduct("Iphone 13 pro");
    }

    return (
        <div>
            <Header></Header>
            <div className="containerf">
                <SalesExecutiveSideBar></SalesExecutiveSideBar>
                <br></br>

                <div className="container1">

                    <div className="row justify-content-center">
                        <div className="col-lg-5" >
                            <br /><br /><br />
                            <div className="card shadow-lg border-0 rounded-lg mt-0">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Add Coupons</h3></div>
                                <div className="card-body">

                                    <form onSubmit={sendData}>



                                        <div className="form-floating mb-3">
                                            <label for="code">Item Code</label>
                                            <br />
                      <br />
                                            <input type="text" class="form-control" id="code" value={code} onChange={(e) => {
                                                setcode(e.target.value);
                                            }} required />
                                        </div>


                                        <div className="form-floating mb-3">
                                            <label for="expiryDate">Expiry Date</label>
                                            <br />
                      <br />
                                            <input type="text" class="form-control" id="expiryDate" value={expiryDate} onChange={(e) => {
                                                setexpiryDate(e.target.value);
                                            }} required />
                                        </div>


                                        <div class="form-floating mb-3">
                                            <label for="usageLimit">Usage Limit</label>
                                            <br />
                      <br />
                                            <input type="text" class="form-control" id="usageLimit" value={usageLimit} onChange={(e) => {
                                                setusageLimit(e.target.value);
                                            }} required />
                                        </div>


                                        <div class="form-floating mb-3">
                                            <label for="usedCount" >Used Count</label>
                                            <br />
                      <br />
                                            <input type="text" class="form-control" id="usedCount" value={usedCount} onChange={(e) => {
                                                setusedCount(e.target.value);
                                            }} required />
                                        </div>

                                        <div class="form-floating mb-3">
                                            <label for="discountPercentage">Discount Percentage</label>
                                            <br />
                      <br />
                                            <input type="text" class="form-control" id="discountPercentage" value={discountPercentage} onChange={(e) => {
                                                setdiscountPercentage(e.target.value);
                                            }} required />
                                        </div>



                                        <div class="form-floating mb-3">
                                            <label for="product" >Product</label>
                                            <br />
                      <br />
                                            <input type="text" class="form-control" id="product" value={product} onChange={(e) => {
                                                setproduct(e.target.value);
                                            }} required />

                                        </div>


                                        <br></br>

                                        <div className="d-grid">
                                            <button type="submit" class="btn btn-primary btn-block" style={{ marginTop: "10px" }}>{""} Insert Data</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            
        </div >
    )
}