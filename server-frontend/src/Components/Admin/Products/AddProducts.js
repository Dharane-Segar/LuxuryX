import React, { useState } from "react";
import axios from "axios";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";

function AddProducts() {
  const [state, setState] = useState({
    ProductName: "",
    Price: 0,
    Description: "",
    Qty: 0,
    Category: "",
    ImageBase64: "",
    isLoading: false,
  });

  const handleSubmit = () => {
    setState({ ...state, isLoading: true });
    if (
      !state.ProductName ||
      !state.Price ||
      !state.Description ||
      !state.Qty ||
      !state.Category ||
      !state.ImageBase64
    ) {
      console.log("Please fill all required fileds.");
      setState({ ...state, isLoading: false });
    } else {
      console.log(state);
      axios
        .post("http://localhost:8070/product", {
          ProductName: state.ProductName,
          Price: state.Price,
          Description: state.Description,
          Qty: state.Qty,
          Category: state.Category,
          ImageBase64: state.ImageBase64,
        })
        .then((res) => {
          console.log(res.data);
          alert("Your data has been successfully added")
          setState({ ...state, isLoading: false });
        })
        .catch((err) => {
          console.log(err);
          setState({ ...state, isLoading: false });
        });
    }
  };

  return (
    <div>
      <AdminDashBoard />
      <div>
        <div>
          <main>
            <div className="container1">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Add Product Details
                      </h3>
                    </div>
                    <div className="card-body">
                      <>
                        <div className="form-floating mb-3">
                          <label>Product Name</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            placeholder="Product Name"
                            onChange={(e) =>
                              setState({
                                ...state,
                                ProductName: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Price</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            placeholder="Price"
                            type={"number"}
                            onChange={(e) =>
                              setState({
                                ...state,
                                Price: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Description</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            placeholder="Description"
                            onChange={(e) =>
                              setState({
                                ...state,
                                Description: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Qty</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            placeholder="Qty"
                            type={"number"}
                            onChange={(e) =>
                              setState({
                                ...state,
                                Qty: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Category</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            placeholder="Category"
                            onChange={(e) =>
                              setState({
                                ...state,
                                Category: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Image</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="file"
                            placeholder="Image"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              const reader = new FileReader();

                              reader.onloadend = () => {
                                setState({
                                  ...state,
                                  ImageBase64: reader.result,
                                });
                              };

                              reader.readAsDataURL(file);
                            }}
                          />
                        </div>

                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            onClick={() => handleSubmit()}
                            disabled={state.isLoading}
                            value={state.isLoading ? "Loading..." : "Add"}
                          ></input>
                        </div>
                      </>
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

export default AddProducts;
