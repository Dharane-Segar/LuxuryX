
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";
export default function AddSupplierTransaction() {

    const [InvoiceNo, setInvoiceNo] = useState("");
    const [SuppliedDate, setSuppliedDate] = useState("");
    const [Supplier, setSupplier] = useState("");
    const [ProductName, setProductName] = useState("");
    const [Quantity, setQuantity] = useState();
    const [Amount, setAmount] = useState();
    let [upQuantity, setIncrQuantity] = useState();
    let [upAmount, setIncrAmount] = useState();
    const [inventories, setInventories] = useState([]);
    const [isMatched, setIsMatched] = useState(true);


    useEffect(() => {
        axios.get("http://localhost:8070/supplierTransaction/supplierTransaction").then((res) => {
            console.log(res.data);
            setInventories(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }, [])

    function sendData(e) {
  
        e.preventDefault();

        const newSupplierTransaction = {
            InvoiceNo,
            SuppliedDate,
            Supplier,
            ProductName,
            Quantity,
            Amount
        }

        axios.post("http://localhost:8070/supplierTransaction/addsupplierTransaction", newSupplierTransaction).then(() => {
            
            alert(`Supplier Transaction Added Successfully`);

            setInvoiceNo("");
            setSuppliedDate("");
            setSupplier("");
            setProductName("");
            setQuantity();
            setAmount();
            window.location.replace("http://localhost:3000/supplierTransaction");

          
        }).catch((err) => {
            alert(err);
        })
       
    }

    return (
        <div >
            <Header></Header>

            <div className="containerf">
                <AdminSideBar></AdminSideBar>
        <div className="container1">
             
        <div className="row justify-content-center">
                            <div className="col-lg-5" >
                                <br/><br/><br/>
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Add Supplier Transaction Details</h3></div>
                                    <div className="card-body">

            <form onSubmit={sendData}>
                <div className="form-floating mb-3"  >
                    
                        <label for="invoiceNo">Invoice No</label>
                        <br />
                          <br />
         
                        <input type="text" className="form-control"  id="invoiceNo" required placeholder="Enter Invoice no" onChange={(e) => {
                            var invoiceNo = setInvoiceNo(e.target.value);
                        }} />
                        <div required/>
                    
                </div>
                <div className="form-floating mb-3">
                    
                        <label for="suppliedDate">Supplied Date</label>
                        <br />
                          <br />
                    
                        <input type="date" className="form-control" id="suppliedDate" required placeholder="Enter Supplied Date" onChange={(e) => {
                            setSuppliedDate(e.target.value);
                        }} />
                    
                </div>
                <div className="form-floating mb-3">
                    
                        <label for="supplier">Supplier</label>
                        <br />
                          <br />
                
                        <input type="text" className="form-control" id="supplier" required placeholder="Enter Supplier Name" onChange={(e) => {
                            setSupplier(e.target.value);
                        }} />
                    
                </div>
                <div className="form-floating mb-3">
                    
                        <label for="productName">Product Name</label>
                        <br />
                          <br />
         
                        <input type="text" className="form-control" id="productName" required placeholder="Enter product name" onChange={(e) => {
                            setProductName(e.target.value);
                        }} />
                    
                </div>

                <div className="form-floating mb-3">
                    
                        <label for="quantity">Quantity</label>
                        <br />
                          <br />
                    
                        <input type="number" className="form-control" required id="quantity" placeholder="Enter quantity " onChange={(e) => {
                            upQuantity = setQuantity(e.target.value);
                            
                        }} />
                    
                </div>
                <div className="form-floating mb-3">
                    
                        <label for="amount">Amount</label>
                        <br />
                          <br />
                  
                        <input type="number" className="form-control" required id="amount" placeholder="Enter total amount " onChange={(e) => {
                            upAmount = setAmount(e.target.value);
                            
                        }} />
                    
                </div>
                <br />



               
                
                
                <div className="d-grid">
                <button type="submit" class="btn btn-primary ">Insert Data</button>
                </div>
            </form>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        <Footer></Footer>
        </div>
    )
}