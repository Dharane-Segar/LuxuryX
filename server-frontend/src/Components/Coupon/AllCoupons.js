import React, { useState, useEffect } from "react";
import axios from "axios"; //to take data from db
import { useNavigate } from "react-router-dom";

import Header from "../SalesExecutive/Header";
import SalesExecutiveSideBar from "../SalesExecutive/SalesExecutiveSideBar";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Footer from "../Common/Footer";
import searchIcon from '@mui/icons-material/Search';

export default function AllCoupons() {

    const [Coupons, setCoupons] = useState([]);
    const [eid, setEid] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        function getCoupons() {
            axios.get("http://localhost:8070/coupon/coupon").then((res) => {
                //console.log(res.data);
                setCoupons(res.data);
            }).catch((err) => {
                alert(err.message)
            })
        }
        getCoupons();
    }, [])



    return (
        <div>
            <Header></Header>
            <div className="container-fluid">
                <SalesExecutiveSideBar></SalesExecutiveSideBar>
                <br></br>

                <div className="container">
                    <br/><br/>
                    <h3>List of Coupons</h3>

                    <div style={{ marginRight: "5px", marginLeft: "100px", marginBottom: "5px", width: "30%" }}>
                        <input type="text" id="search" placeholder="Enter Item Code..." onChange={(e) => { setEid(e.target.value) }} />
                    </div>

                    <div className="d-flex justify-content-center" style={{ marginRight: "5px", marginLeft: "auto", marginBottom: "5px", width: "30%" }}>
                        <button class="btn btn-primary btnView" onClick={() => {
                            window.location.replace(`http://localhost:3000/search/searchcoupon/${eid}`);
                        }}>search</button>
                    </div>
                    <br/>


                    <table className="table">
                        <thead>
                            <tr className="table-dark">

                                <th scope='col'>Item Code</th>
                                <th scope='col'>Expiry Date</th>
                                <th scope='col'>Usage Limit</th>
                                <th scope='col'>Used Count</th>
                                <th scope='col'>Discount Percentage</th>
                                <th scope='col'>Product</th>
                                <th ></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Coupons.map((coupon) => (
                                    <tr scope="row">
                                        <td>{coupon.code}</td>
                                        <td>{coupon.expiryDate}</td>
                                        <td>{coupon.usageLimit}</td>
                                        <td>{coupon.usedCount}</td>
                                        <td>{coupon.discountPercentage}</td>
                                        <td>{coupon.product}</td>

                                        <td >
                                            <button className="btn btn-secondary" onClick={() => {
                                                window.location.replace(`http://localhost:3000/updatecoupon/${coupon._id}`)
                                            }}><CreateIcon /></button>


                                            <button className="btn btn-danger" onClick={() => {
                                                axios.delete(`http://localhost:8070/coupon/deletecoupon/${coupon._id}`).then(() => {
                                                    alert("Coupon details deleted!");
                                                    window.location.replace("http://localhost:3000/coupon");
                                                }).catch((err) => {
                                                    alert(err)
                                                });
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
        </div>
    )
}