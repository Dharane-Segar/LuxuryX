import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Footer from "../Common/Footer";

export default function AllSupplierTransaction() {
  const [supplierTransactions, setSupplierTransaction] = useState([]);

  useEffect(() => {
    getSuppdata();
  }, []);

  const getSuppdata = async () => {
    const supplierData = async () => {
      axios
        .get("http://localhost:8070/supplierTransaction/supplierTransaction")
        .then((res) => {
          console.log(res.data);
          setSupplierTransaction(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    supplierData();
  };

  //fetch search function from backend
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:8070/supplierTransaction/search/${key}`
      );
      result = await result.json();
      if (result) {
        setSupplierTransaction(result);
      }
    } else {
      getSuppdata();
    }
  };

  return (
    <div>
      <Header></Header>

      <div className="containerf">
        <AdminSideBar></AdminSideBar>

        <div className="container" style={{ marginTop: "100px" }}>
          <h2 style={{ marginLeft: "90px"}}>All Supplier Trasactions</h2>

          <div style={{ textAlign: "right" }}>
            <input
              type=""
              className="search-product-box"
              placeholder="search Invoice No"
              onChange={searchHandle}
            />
          </div>

          <div>
            <button
              style={{ marginBottom: "10px", marginLeft: "110px" }}
              className="btn btn-primary"
              onClick={() => {
                window.location.replace(
                  `http://localhost:3000/supplierTransactionReport`
                );
              }}
            >
              Generate Supplier Transaction Report
            </button>
          </div>
          <div>
            <table class="table ">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Invoice No</th>
                  <th scope="col">Supplied Date</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>

              <tbody>
                {supplierTransactions.map((supplierTransaction) => (
                  <tr scope="row">
                    <td>{supplierTransaction.InvoiceNo}</td>
                    <td>{supplierTransaction.SuppliedDate}</td>
                    <td>{supplierTransaction.Supplier}</td>
                    <td>{supplierTransaction.ProductName}</td>
                    <td>{supplierTransaction.Quantity}</td>
                    <td>{supplierTransaction.Amount}</td>

                    <td>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="btn btn-secondary"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          window.location.replace(
                            `http://localhost:3000/updatesupplierTransaction/${supplierTransaction._id}`
                          );
                        }}
                      >
                        <CreateIcon />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          window.location.replace(
                            `http://localhost:3000/deletesupplierTransaction/${supplierTransaction._id}`
                          );
                        }}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a
            href="/supplierTransaction"
            type="button"
            class="btn btn-secondary float-right"
            style={{ width: "100px", marginTop: "120%", marginLeft: "80px" }}
          >
            back{" "}
          </a>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
