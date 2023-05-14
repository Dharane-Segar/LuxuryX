import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import Layout from "antd/es/layout/layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
//total price

const Checkout = () => {
  const [auth, setAuth] = useAuth();
  //state
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [cart, setCart] = useCart();
  var product;
  //onst [product, setProduct] = useState("");
  const [total, setTotal] = useState("");
  //const { total } = useParams();
  //get user data

  function handleSubmit(e) {
    const newOrder = {
      email,
      product,
      total,
      address,
      contact,
    };
    axios
      .post("http://localhost:8071/order/submit", newOrder)
      .then(() => {
        alert("Order placed");
      })
      .catch((err) => {
        toast.warn("Invalid details 👎!", {
          position: "top-center",
        });
      });
  }
  useEffect(() => {
    const { email, address, contact } = auth?.user;
    setEmail(email);
    setAddress(address);
    setContact(contact);
  }, [auth?.user]);
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((Product) => {
        total = total + Product.Price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-9">
          <div className="container">
            <form>
              <h4 className="title">Place Order</h4>
              <div className="mb-3">
                <label for="password" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">
                  Products
                </label>
                <div className="col-md-4 text-center">
                  {cart?.map((product) => (
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      name="prod"
                      value={product.ProductName}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label for="password" className="form-label">
                  Total
                </label>

                <div className="col-md-4 text-center">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    name="prod"
                    value={totalPrice()}
                    onChange={(e) => {
                      setTotal(total.totalPrice());
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label for="password" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAddress"
                  placeholder="Enter Your contact no"
                  name="address"
                  value={contact}
                />
              </div>

              <div class="d-grid">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Checkout;
