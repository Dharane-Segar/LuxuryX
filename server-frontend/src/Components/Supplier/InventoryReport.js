import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Admin/Header';
import AdminSideBar from '../Admin/AdminSidebar';
import Footer from '../Common/Footer';

export default function InventoryReport() {
  const [supplierTransactions, setSupplierTransactions] = useState([]);

  useEffect(() => {
    getInventoryData();
  }, []);

  const getInventoryData = async () => {
    const response = await axios.get('http://localhost:8070/supplierTransaction/supplierTransaction');
    setSupplierTransactions(response.data);
  };

  return (
    <div>
      <Header />
      <div className="containerf">
        <AdminSideBar />
        <div className="container" style={{ marginTop: '100px' }}>
          <h3>Inventory Report</h3>
          <br></br>
          <div>
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity Available</th>
                </tr>
              </thead>
              <tbody>
                {supplierTransactions.map((supplierTransaction) => (
                  <tr key={supplierTransaction._id}>
                    <td>{supplierTransaction.ProductName}</td>
                    <td>{supplierTransaction.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href="/dashboard" type="button" className="btn btn-secondary float-right" style={{ width: '100px', marginTop: '120%', marginLeft: '80px' }}>
            Back
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
