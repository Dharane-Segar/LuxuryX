import React from "react";
import { useAuth } from "../../context/auth";
import { NavLink, Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonAdd } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsFillBagFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";

//Header element
const Header = (props) => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  //remove the logged in user from local storage
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/">
              <img
                src="/images/image.png"
                alt="luxuryx"
                style={{ width: "35%", height: "20%" }}
                onClick="/"
              />
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  <BsFillHouseDoorFill /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/location"
                  className="nav-link active"
                  aria-current="page"
                >
                  <BsGeoAlt /> Store Locator
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/*"
                  className="nav-link active"
                  aria-current="page"
                >
                  <BsTruck /> Track your order
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/allItems"
                  className="nav-link active"
                  aria-current="page"
                >
                  <BsFillBagFill /> Shop
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div className="navbar-nav ms-auto mb-2 mb-lg-0">
          <ul class="nav justify-content-end">
            {!auth.user ? (
              <>
                <li class="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <BsPersonAdd /> Register
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <BsPersonCircle /> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BsPersonCircle /> {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/dashboard/user" className="dropdown-item">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="dropdown-item"
                        aria-current="page"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li class="nav-item">
              <NavLink
                to="/wishlist"
                className="nav-link active"
                aria-current="page"
              >
                <BsHeartFill /> Wishlist
              </NavLink>
            </li>
            <NavLink
              to="/ProdCart"
              className="nav-link active"
              aria-current="page"
            >
              <BsFillCartFill />
              Cart {cart?.length}
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;
