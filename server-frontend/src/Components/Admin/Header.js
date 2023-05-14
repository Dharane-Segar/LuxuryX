import React from "react";

function Header() {
  function toggle() {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      /*if (window.localStorage.getItem('sb|sidebar-toggle') === 'true') {
                    document.body.classList.toggle('sb-sidenav-toggled');
                }*/
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
        window.localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sb-sidenav-toggled")
        );
      });
    }
  }

  var user = JSON.parse(localStorage.getItem("AdminInfo"));

  return (
    <div>
      <nav className="sb-topnav navbar navbar-expand ">
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand"style={{color:"white",marginLeft:"50px"}} href="/adhome">
          Luxury X
        </a>
        {/* <!-- Sidebar Toggle--> */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={toggle}
        >
          
        </button>
        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <a className="navbar-brand " style={{color:"white"}}>
          {user.fullname}
        </a>
        </form>
        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown" style={{color:"white"}}>
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{color:"white"}}
            >
              <i className="fa fa-user" style={{color:"white"}}></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
              
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("AdminInfo");
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
