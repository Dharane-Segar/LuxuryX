import React from "react";

function Header() {
  var user = JSON.parse(localStorage.getItem("SEInfo"));

  window.addEventListener("DOMContentLoaded", (event) => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      if (localStorage.getItem("sb|sidebar-toggle") === "true") {
        document.body.classList.toggle("sb-sidenav-toggled");
      }
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
        localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sb-sidenav-toggled")
        );
      });
    }
  });
  return (
    <div>
      <nav className="sb-topnav navbar navbar-expand ">
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand " style={{color:"white",marginLeft:"50px"}}href="/sehome">
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
                    localStorage.removeItem("SEInfo");
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
