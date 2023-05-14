import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function UpdateOrder() {

    const [OrderNo, setOrderNo] = useState("");
    const [ProductName, setProductName] = useState("");
    const [Address, setAddress] = useState("");
    const [Email, setEmail] = useState("");
    const [Price, setPrice] = useState();
    const [Status, setStatus] = useState("");

    const {id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/order/getorder/${id}`).then((res) => {
            console.log(res.data.order);

            setOrderNo(res.data.orders.OrderNo);
            setProductName(res.data.orders.ProductName);
            setAddress(res.data.orders.Address);
            setEmail(res.data.orders.Email);
            setPrice(res.data.orders.Price);
            setStatus(res.data.orders.Status);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function updateData(e) {
        e.preventDefault();

        const newOrder = { OrderNo, ProductName, Address, Email, Price, Status }
        axios.put(`http://localhost:8070/order/updateorder/${id}`, newOrder).then(() => {
            alert("Order  Updated");

            window.location.replace("http://localhost:3000/order");

        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div >
            <Header></Header>

            <div className="containerf">
                <AdminSideBar></AdminSideBar>
                <div className="container" style={{marginTop:"100px",marginLeft:"350px"}}>
                    <h1>Update Order</h1>
                    <form onSubmit={updateData}>
                        <div className="form-group">
                            
                        <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                                <label  for="OrderNo">Order No</label>
                            </div>

                            <div class="col-sm-10">
                                <input disabled type="text" className="form-control" id="OrderNo" required value={OrderNo} placeholder="Enter Order No" onChange={(e) => {
                                    setOrderNo(e.target.value);
                                }} />
                            </div>

                        </div>
                        <div className="form-group">
                            <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                                <label for="ProductName">Product Name</label>
                            </div>

                            <div class="col-sm-10">
                                <input disabled type="text" className="form-control" id="ProductName" required value={ProductName} placeholder="Enter Product Name" onChange={(e) => {
                                    setProductName(e.target.value);
                                }} />
                            </div>
                        </div>


                        <div className="form-group">
                            <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                                <label for="Address">Address</label>
                            </div>

                            <div class="col-sm-10">
                                <input  disabled type="text" className="form-control" id="Address" required value={Address} placeholder="Enter Address" onChange={(e) => {
                                    setAddress(e.target.value);

                                }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                                <label for="Email">Email</label>
                            </div>

                            <div class="col-sm-10">
                                <input disabled type="text" className="form-control" id="Email" required value={Email} placeholder="Enter Email" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                                <label for="Price">Price</label>
                            </div>

                            <div class="col-sm-10">
                                <input disabled type="number" className="form-control" id="Price" required value={Price} placeholder="Enter Price" onChange={(e) => {
                                    setPrice(e.target.value);
                                }} />
                            </div>
                        </div>


                        <FormControl style={{marginTop:"20px", marginRight:"180px", width: "84%"}} >
                        <InputLabel  id="Status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="Status"
                                value={Status}
                                label="Status"
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }} >
                            
                                <MenuItem value="Order Placed">Order Placed</MenuItem>
                                <MenuItem value="Order Processing">Order Processing</MenuItem>
                                <MenuItem value="Order in Transit">Order in transit</MenuItem>
                                <MenuItem value="Order Completed">Order Completed</MenuItem>
                            </Select>

                        </FormControl>
                            
                       

                        <button type="Update" class="btn btn-primary" style={{ marginTop: "10px" }}>Update <CreateIcon /></button>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default UpdateOrder;