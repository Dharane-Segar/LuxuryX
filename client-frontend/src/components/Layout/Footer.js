import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsPhone } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
const Footer = () => {
  //footer component
  return (
    <footer className="page-footer font-small text-white pt-4 bg-dark">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">LuxuryX</h5>
            <p>
              Buy Apple Products for best price in Sri Lanka. LuxuryX values
              what makes you different, and encourages you to look smart on your
              daily act-no matter-we give opportunity to shine bright by
              providing affordable prices for Luxury goods.We committed to serve
              100% customer satisfaction by offering genuine products, proven by
              hundreds of customers' positive reviews. Proud to be a market
              leader for best price on all Apple products in Sri Lanka.
            </p>
            <div>
              <Link to="/" className="me-4 text-reset">
                <BsFacebook />{" "}
              </Link>
              <Link to="/" className="me-4 text-reset">
                <BsWhatsapp />{" "}
              </Link>
              <Link to="/" className="me-4 text-reset">
                <BsInstagram />{" "}
              </Link>
              <Link to="/" className="me-4 text-reset">
                <BsLinkedin />{" "}
              </Link>
              <Link to="/" className="me-4 text-reset">
                <BsTwitter />{" "}
              </Link>
            </div>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Pages</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" class="link-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" class="link-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" class="link-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" class="link-light">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Contact Info</h5>
            <ul className="list-unstyled">
              <li>
                <p>
                  <BsHouseDoor /> 09, Galle Road, Bambalapitiya, Colombo 04.
                  (Opp Majestic City)
                </p>
              </li>
              <li>
                <p>
                  <BsPhone /> 077 0822 346
                </p>
              </li>
              <li>
                <p>
                  <BsEnvelope /> sales.rooter@gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        © LuxuryX - 2016 to 2023 All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
