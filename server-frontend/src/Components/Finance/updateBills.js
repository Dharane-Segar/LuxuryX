import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

export default function UpdateBills() {

  const [newName, setnewName] = useState("");
  const [newAmount, setnewAmount] = useState("");
  const [newStatus, setnewStatus] = useState(0);
  const [newDate, setnewDate] = useState("");
  
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/bills/readBillsByID/${id}`).then((res) => {
            console.log(res.data[0]._id)
            setnewName(res.data[0].name);
            setnewAmount(res.data[0].amount);
            setnewStatus(res.data[0].status);
            setnewDate(res.data[0].date);
      

        }).catch((err)=>{
            console.log(err)
        })
    },[])

    function updateData(e) {
        e.preventDefault();

        const newSupp = {
            newName,
            newAmount,
            newStatus,
            newDate,
      
        }

        axios.put(`http://localhost:8070/bills/updateBills/${id}`,newSupp).then(() => {
            alert("Supplier details updated");
            window.location.replace("http://localhost:3000/bills");

        }).catch((err) => {
            alert(err)
        })

    }
    return (

        <div >
            <Header></Header>

            <div className="container">
                <AdminSideBar></AdminSideBar>
            <div className="container" style={{marginTop:"100px"}}>
            
            <form onSubmit={updateData}>
                        <h3>Update Bill Details</h3>

                        <div className="form-group">
                            <label for="Name">Name</label>
                            <input type="text" class="form-control" id="name" value={newName} onChange={(e) => {
                                setnewName(e.target.value);
                            }} required />
                            

                        </div>
                        <div className="form-group">
                            <label for="amount">Amount</label>
                            <input type="text" class="form-control" id="amount" value={newAmount} onChange={(e) => {
                                setnewAmount(e.target.value);
                            }} required />
                            
                        </div>


                        <div className="form-group">
                            <label for="status">Status</label>
                            <input type="text" class="form-control" id="status" value={newStatus} onChange={(e) => {
                                setnewStatus(e.target.value);
                            }} required />

                            
                        </div>

                        <div className="form-group">
                            <label for="date">Date</label>
                            <input type="date" class="form-control" id="date" value={newDate} onChange={(e) => {
                                setnewDate(e.target.value);
                            }} required />

                            
                        </div>
                       

                        <button type="submit" class="btn btn-primary" style={{marginTop:"10px"}}>Update <i class="fa fa-check"></i></button>

                        <a href="/bills" type="button" class="btn btn-secondary" style={{ marginTop:"20px", marginLeft: "740px" }}>back <i class="fa fa-reply"></i></a>
                 
                    </form>

        </div>
        </div>
        <Footer></Footer>
        </div>

    )

}
    
