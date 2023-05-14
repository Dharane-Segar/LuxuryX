import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import AdminDashBoard from "../AdminDashBoard";
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Footer from "../../Common/Footer";
import { useReactToPrint } from "react-to-print";

function ViewProducts() {
  const navigate = useNavigate();
  const componentPDF = useRef();

  const [state, setState] = useState({
    getAllProducts: [],
    isLoading: false,
  });

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "ProductReport",
    onAfterPrint: () => {
      window.location.replace("/ViewProducts");
    },
  });

  const getProducts = () => {
    setState({ ...state, isLoading: true });
    axios
      .get("http://localhost:8070/product")
      .then((res) => {
        console.log(res.data);
        setState({ ...state, isLoading: false, getAllProducts: res.data });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, isLoading: false });
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/product/${id}`)
      .then((res) => {
        console.log(res);
        alert("Your data has been successfully deleted...!");
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (item) => {
    localStorage.setItem("products", JSON.stringify(item));
    navigate("/EditProducts");
  };

  return (
    <div>
      <AdminDashBoard />
      <div>
        <div>
          <main>
            <div className="container" style={{ marginTop: "100px" }}>
              <div >
                <div >
                  <div>
                    <h1 style={{ textAlign: "center", marginLeft: "160px"}}>View All Products</h1>
                    <div >
                    <a className="btn btn-primary" style={{ marginLeft: "500px" }}onClick={generatePDF}>
                        Generate Report
                      </a>
                      <br/><br/>
                      <div ref = {componentPDF}>
                      <table className="table">
                        <thead>
                          <tr className="table-dark">
                            <th scope='col'>Image</th>
                            <th scope='col'>Product Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Qty</th>
                            <th scope='col'>Category</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.getAllProducts ? (
                            state.getAllProducts?.map((item) => (
                              <tr>
                                <th scope="row">
                                  <img
                                    src={`${item.ImageBase64}`}
                                    alt="Product_Image"
                                    width={"50px"}
                                    height={"50px"}
                                    style={{ borderRadius: "50px" }}
                                  />
                                </th>
                                <td>{item.ProductName}</td>
                                <td>{item.Price}</td>
                                <td>{item.Description}</td>
                                <td>{item.Qty}</td>
                                <td>{item.Category}</td>
                                <td>
                                  <div
                                    className='d-flex justify-content-between'
                                    role="group"
                                    aria-label="Actions"
                                  >
                                    <button className='btn btn-secondary' onClick={() => handleEdit(item)}><CreateIcon /></button>
                                    <button className='btn btn-danger' onClick={() => handleDelete(item._id)} ><DeleteOutlineIcon /></button>

                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <p>Loading...</p>
                          )}
                        </tbody>
                      </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
     <Footer></Footer>
    </div>
  );
}

export default ViewProducts;
