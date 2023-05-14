import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import Footer from "../Common/Footer";

export default function DeleteSupplierTransaction() {
    const [InvoiceNo, setInvoiceNo] = useState("");
    const [SuppliedDate, setSuppliedDate] = useState("");
    const [Supplier, setSupplier] = useState("");
    const [ProductName, setProductName] = useState("");
    const [Quantity, setQuantity] = useState();
    const [Amount, setAmount] = useState();

    const { del, id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/supplierTransaction/getsupplierTransaction/${id}`).then((res) => {
            console.log(res.data);
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

    function deleteData(e) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/supplierTransaction/deletesupplierTransaction/${id}`).then(() => {
            alert("Supplier Transaction deleted");

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

            <div className="container" style={{marginTop:"100px"}} >
        <div className="container">
            <h1>Delete Supplier Transaction</h1>
            <br></br>
            <form style={{ marginLeft:"100px"}}onSubmit={deleteData}>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="invoiceNo">Invoice No</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="InvoiceNo" value={InvoiceNo} placeholder="Enter Invoice No" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="suppliedDate">Supplied Date</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="Date" className="form-control" id="suppliedDate" value={SuppliedDate} placeholder="Enter Supplied Date" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="supplier">Supplier</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="supplier" value={Supplier} placeholder="Enter Supplier Name" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="productName">ProductName</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="productName" value={ProductName} placeholder="Enter ProductName" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="quantity">Quantity</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="Number" className="form-control" id="quantity" value={Quantity} placeholder="Enter Quantity" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="amount">Amount</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="number" className="form-control" id="amount" value={Amount} placeholder="Enter Amount " disabled />

                    </div>
                </div>

                
                <button type="submit" class="btn btn-danger" style={{ marginTop:"10px"}}>Delete <DeleteOutlineIcon /></button>
               </form>
        </div>
        </div>
        </div>
        <Footer></Footer>
        </div>


    )
}