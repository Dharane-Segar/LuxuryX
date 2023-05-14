import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Footer from "../Common/Footer";


export default function AllOrder() {

    const [OrderNo, setOrderNo] = useState("");
    const [order, setOrder] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getOrderdata();
    }, []);

    const getOrderdata = async () => {
        const orderData = async () => {
            axios.get("http://localhost:8070/order/order").then((res) => {
                console.log(res.data);
                setOrder(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }
        orderData();
    }


    //fetch search function from backend
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8070/order/search/${key}`);
            result = await result.json();
            if (result) {
                setOrder(result);
            }
        } else {
            getOrderdata();
        }
    };

    return (
        <div>
            <Header></Header>



            <div className="containerf">
                <AdminSideBar></AdminSideBar>

                <div className="container" style={{ marginTop: "100px" }}>
                    <h3>All Orders</h3>

                    <div style={{ textAlign: "right" }}>
                        <input
                            type=""
                            className="search-product-box"
                            placeholder="search Order"
                            onChange={searchHandle}

                        />
                    </div>


                    <div >




                        <button style={{ marginBottom: "10px", marginRight: "350px", marginLeft: "150px" }} className="btn btn-primary" onClick={() => {
                            window.location.replace(`http://localhost:3000/orderReport`);
                        }}>Generate Orders Report</button>




                    </div>

                    <div>
                        <table class="table ">
                            <thead>
                                <tr className="table-dark">

                                    <th scope='col'>Order No</th>
                                    <th scope='col'>Product Name</th>
                                    <th scope='col'>Address</th>
                                    <th scope='col'>Email </th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Operations</th>


                                </tr>
                            </thead>

                            <tbody>
                                {

                                    order.map((order) => (

                                        <tr scope="row">
                                            <td >{order.OrderNo}</td>
                                            <td >{order.ProductName}</td>
                                            <td >{order.Address}</td>
                                            <td >{order.Email}</td>
                                            <td >{order.Price}</td>
                                            <td >{order.Status}</td>

                                            <td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <button className="btn btn-secondary" style={{ marginRight: "10px" }} onClick={() => {
                                                    window.location.replace(`http://localhost:3000/updateorder/${order._id}`);
                                                }}><CreateIcon /></button>

                                                <button className="btn btn-danger" onClick={() => {

                                                    window.location.replace(`http://localhost:3000/deleteorder/${order._id}`);
                                                }}><DeleteOutlineIcon /></button>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button className="btn btn-primary" onClick={() => {

                                                    window.location.replace(`http://localhost:3000/addd/${order.OrderNo}`);
                                                }}><LocalShippingIcon /></button>
                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <a href="/order" type="button" class="btn btn-secondary float-right" style={{ width: "100px", marginTop: "120%", marginLeft: "80px" }}>back <i class="fa fa-reply"></i></a>


                </div>
            </div>


            <Footer></Footer>
        </div >
    )
}