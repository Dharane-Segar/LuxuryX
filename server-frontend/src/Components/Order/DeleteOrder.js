import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function DeleteOrder() {
    const [OrderNo, setOrderNo] = useState("");
    const [ProductName, setProductName] = useState("");
    const [Address, setAddress] = useState("");
    const [Email, setEmail] = useState("");
    const [Price, setPrice] = useState();
    const [Status, setStatus] = useState();

    const { del, id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/order/getorder/${id}`).then((res) => {
            console.log(res.data);
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

    function deleteData(e) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/order/deleteorder/${id}`).then(() => {
            alert("Order deleted");

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

            <div className="container" style={{marginTop:"100px",marginLeft:"350px"}} >
        <div className="container">
            <h1>Delete Order</h1>
            <form onSubmit={deleteData}>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="OrderNo">Order No</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="OrderNo" value={OrderNo} placeholder="Enter Order No" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="ProductName">Product Name</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="ProductName" value={ProductName} placeholder="Enter Product Name" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="Address">Address</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="Address" value={Address} placeholder="Enter Address" disabled />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="Email">Email</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="Email" value={Email} placeholder="Enter Email" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="Price">Price</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="Number" className="form-control" id="Price" value={Price} placeholder="Enter Price" disabled />
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
                                }} disabled>
                            
                                <MenuItem value="Order Placed">Order Placed</MenuItem>
                                <MenuItem value="Order Processing">Order Processing</MenuItem>
                                <MenuItem value="Order in Transit">Order in transit</MenuItem>
                                <MenuItem value="Order Completed">Order Completed</MenuItem>
                            </Select>

                        </FormControl>

                
                <button type="submit" class="btn btn-danger" style={{ marginTop:"10px"}}>Delete <DeleteOutlineIcon /></button>
                <a  type="button" href = "/order" class="btn btn-secondary" style={{ marginTop:"10px", marginLeft:"420px"}}>Back <i class="fa fa-reply"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </form>
        </div>
        </div>
        </div>
        <Footer></Footer>
        </div>


    )
}