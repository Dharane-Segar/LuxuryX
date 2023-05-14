import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

function UpdateInventory() {
   
    const [InvoiceNo, setInvoiceNo] = useState("");
    const [SuppliedDate, setSuppliedDate] = useState("");
    const [Supplier, setSupplier] = useState("");
    const [ProductName, setProductName] = useState("");
    const [Quantity, setQuantity] = useState();
    const [Amount, setAmount] = useState();

    const { updatesupplierTransaction, id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8070/supplierTransaction/getsupplierTransaction/${id}`).then((res) => {
            console.log(res.data.supplierTransaction);

            setInvoiceNo(res.data.supplierTransaction.InvoiceNo);
            setSuppliedDate(res.data.supplierTransaction.SuppliedDate);
            setSupplier(res.data.supplierTransaction.Supplier);
            setProductName(res.data.supplierTransaction.ProductName);
            setQuantity(res.data.supplierTransaction.Quantity);
            setAmount(res.data.supplierTransaction.Amount);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function updateData(e) {
        e.preventDefault();

        const newSupplierTransaction = { InvoiceNo, SuppliedDate, Supplier, ProductName, Quantity, Amount }
        axios.put(`http://localhost:8070/supplierTransaction/updatesupplierTransaction/${id}`, newSupplierTransaction).then(() => {
            alert("Supplier Transaction  Updated");
           
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
        <div className="container" style={{marginTop:"100px",marginLeft:"520px", marginRight:"400px"}}>
            <h1>Update Supplier Transaction</h1>
            <form style={{marginLeft:"50px"}}onSubmit={updateData}>
                <div className="form-group">

                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="invoiceNo">Invoice No</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="InvoiceNo" required value={InvoiceNo} placeholder="Enter Invoice No" onChange={(e) => {
                        setInvoiceNo(e.target.value);
                    }} />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="suppliedDate">Supplied Date</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="date" className="form-control" id="suppliedDate" required  value={SuppliedDate} placeholder="Enter Supplied Date" onChange={(e) => {
                        setSuppliedDate(e.target.value);
                    }} />
                    </div>
                </div>
 

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="supplier">Supplier</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="Supplier" required value={Supplier} placeholder="Enter Supplier Name" onChange={(e) => {
                        setSupplier(e.target.value);

                    }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="productName">Product Name</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="ProductName" required value={ProductName} placeholder="Enter Product Name" onChange={(e) => {
                        setProductName(e.target.value);
                    }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="quantity">Quantity</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="number" className="form-control" id="quantity" required value={Quantity} placeholder="Enter Quantity" onChange={(e) => {
                        setQuantity(e.target.value);
                    }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="amount">Amount</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="number" className="form-control" id="amount" required value={Amount} placeholder="Enter total amount" onChange={(e) => {
                        setAmount(e.target.value);
                    }} />
                    </div>
                </div>

                
                <button type="Update" class="btn btn-success" style={{marginTop:"10px"}}>Update <CreateIcon /></button>
            </form>
        </div>
        </div>
        <Footer></Footer>
        </div>
    )
}

export default UpdateInventory;