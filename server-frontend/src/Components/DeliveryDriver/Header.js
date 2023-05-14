import React from "react";

function Header() {
  var user = JSON.parse(localStorage.getItem("DDInfo"));
  return (
    <div>
      <nav className="sb-topnav navbar navbar-expand ">
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand ps-3" href="/ddhome" style={{color:"white",marginLeft:"50px"}}>
          Luxury X
        </a>
        
        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <a className="navbar-brand" style={{color:"white"}}>{user.fullname}</a>
        </form>
        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown" style={{color:"white"}}>
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{color:"white"}}
            >
              <i className="fas fa-user" style={{color:"white"}}></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("DDInfo");
                    window.location.replace("/");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
