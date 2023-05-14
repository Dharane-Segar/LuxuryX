import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

export default function UpdateTransaction() {

    const [newtypeshow, setNewTypeshow] = useState("");
  const [newcategoryshow, setNewCategoryshow] = useState("");
  const [newamountshow, setNewAmountshow] = useState(0);
  const [newremarkshow, setNewRemarkshow] = useState("");
  const [newdateshow, setNewDateshow] = useState("");
  const [newnameshow, setNewNameshow] = useState("");
  const [idshow, setidshow] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/financeTransaction/readTByID/${id}`).then((res) => {
            console.log(res.data[0]._id)
      setNewTypeshow(res.data[0].type);
      setNewCategoryshow(res.data[0].category);
      setNewAmountshow(res.data[0].amount);
      setNewRemarkshow(res.data[0].remark);
      setNewDateshow(res.data[0].date);
      setNewNameshow(res.data[0].name);
      setidshow(res.data[0]._id);

        }).catch((err)=>{
            console.log(err)
        })
    },[])

    function updateData(e) {
        e.preventDefault();

        const newSupp = {
            newnameshow,
      newtypeshow,
      newcategoryshow,
      newamountshow,
      newremarkshow,
      newdateshow
        }

        axios.put(`http://localhost:8070/financeTransaction/updateT/${id}`,newSupp).then(() => {
            alert("Supplier details updated");
            window.location.replace("http://localhost:3000/financeTrans");

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
                        <h3>Update Transaction Details</h3>

                        <div className="form-group">
                            <label for="Name">Name</label>
                            <input type="text" class="form-control" id="name" value={newnameshow} onChange={(e) => {
                                setNewNameshow(e.target.value);
                            }} required />
                            

                        </div>
                        <div className="form-group">
                            <label for="amount">Amount</label>
                            <input type="text" class="form-control" id="amount" value={newamountshow} onChange={(e) => {
                                setNewAmountshow(e.target.value);
                            }} required />
                            
                        </div>

                        <div className="form-group">
                        <select name="" id="select" placeholder='Type' value={newtypeshow} onChange={(event) => { setNewTypeshow(event.target.value); }}>
                            <option value="">--Select a type--</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select><br />

                            
                        </div>

                        <div className="form-group">
                            <label for="category">Category</label>
                            <input type="text" class="form-control" id="category" value={newcategoryshow} onChange={(e) => {
                                setNewCategoryshow(e.target.value);
                            }} required />

                            
                        </div>

                        <div className="form-group">
                            <label for="remark">Remark</label>
                            <input type="text" class="form-control" id="remark" value={newremarkshow} onChange={(e) => {
                                setNewRemarkshow(e.target.value);
                            }} required />

                            
                        </div>
                        <div className="form-group">
                            <label for="date">Date</label>
                            <input type="date" class="form-control" id="date" value={newdateshow} onChange={(e) => {
                                setNewDateshow(e.target.value);
                            }} required />

                            
                        </div>

                        <button type="submit" class="btn btn-primary" style={{marginTop:"10px"}}>Update <i class="fa fa-check"></i></button>

                        <a href="/financeTrans" type="button" class="btn btn-secondary" style={{ marginTop:"20px", marginLeft: "740px" }}>back <i class="fa fa-reply"></i></a>
                 
                    </form>

        </div>
        </div>
        <Footer></Footer>
        </div>

    )

}
    
