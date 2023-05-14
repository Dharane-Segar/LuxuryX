import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import "./prod.css";
function Product() {
  const [cart, setCart] = useCart([]);
  const [searchKey, setSearchKey] = useState("");

  const [state, setState] = useState({
    getAllProducts: [],
    isLoading: false,
  });
  //function to get all the products from the database
  const getProducts = () => {
    setState({ ...state, isLoading: true });
    axios
      .get("http://localhost:8071/product")
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

  const filteredProducts = state.getAllProducts.filter((getallProducts) => {
    const name = getallProducts.ProductName.toLowerCase();
    const price = getallProducts.Price.toString();

    return name.includes(searchKey) || price.includes(searchKey);
  });

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:8071/product/searchProduct/${key}`
      );
      result = await result.json();
      if (result) {
        getProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <Layout>
      <div className="container1">
        <div className="row justify-content-center">
          <input
            type="text"
            className="form-control s-bar"
            id={searchKey}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>

        <h1 style={{ textAlign: "center" }}>Products</h1>
        <div className="products">
          {filteredProducts.map((product, index) => {
            return (
              <div className="product-card" key={index}>
                <div className="product-image-container">
                  <img src={`${product.ImageBase64}`} alt="Product_Image" />
                </div>
                <div className="product-details">
                  <h2 className="product-name">{product.ProductName}</h2>
                  <p className="product-description">{product.Description}</p>
                  <p className="product-price">Price - Rs.{product.Price}</p>
                  <button
                    className="product-add-to-cart-btn"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify(...cart, product)
                      );
                      toast.success("Item added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Product;
